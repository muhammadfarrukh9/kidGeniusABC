const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const cmakePath = path.join(
  projectRoot,
  "node_modules",
  "react-native-reanimated",
  "android",
  "CMakeLists.txt"
);

const original =
  'string(APPEND CMAKE_CXX_FLAGS " -fexceptions -fno-omit-frame-pointer -frtti -fstack-protector-all -std=c++${CMAKE_CXX_STANDARD} -Wall -Werror")';
const patched =
  'string(APPEND CMAKE_CXX_FLAGS " -fexceptions -fno-omit-frame-pointer -frtti -fstack-protector-all -std=c++${CMAKE_CXX_STANDARD} -Wall -Werror -Wno-error=vla-cxx-extension -Wno-error=deprecated-this-capture")';

if (fs.existsSync(cmakePath)) {
  const source = fs.readFileSync(cmakePath, "utf8");

  if (!source.includes(patched)) {
    if (source.includes(original)) {
      fs.writeFileSync(cmakePath, source.replace(original, patched));
      console.log("Applied Reanimated CMake warning patch for Android NDK 27.");
    } else {
      console.warn("Reanimated CMake warning patch was not applied; expected line was not found.");
    }
  }
}

const androidResPath = path.join(projectRoot, "android", "app", "src", "main", "res");
const splashXmlPath = path.join(androidResPath, "drawable", "splashscreen.xml");
const stringsPath = path.join(androidResPath, "values", "strings.xml");

if (fs.existsSync(splashXmlPath)) {
  const splashXml = `<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
  <item>
    <bitmap
      android:src="@drawable/splashscreen_image"
      android:gravity="fill"/>
  </item>
</layer-list>
`;
  fs.writeFileSync(splashXmlPath, splashXml);
  console.log("Applied full-screen Android splash drawable patch.");
}

if (fs.existsSync(stringsPath)) {
  const strings = fs.readFileSync(stringsPath, "utf8");
  const nextStrings = strings.replace(
    /<string name="expo_splash_screen_resize_mode" translatable="false">.*?<\/string>/,
    '<string name="expo_splash_screen_resize_mode" translatable="false">cover</string>'
  );
  if (nextStrings !== strings) {
    fs.writeFileSync(stringsPath, nextStrings);
    console.log("Applied Android splash resize mode patch.");
  }
}
