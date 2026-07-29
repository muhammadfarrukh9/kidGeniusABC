const fs = require("fs");
const path = require("path");

const cmakePath = path.join(
  __dirname,
  "..",
  "node_modules",
  "react-native-reanimated",
  "android",
  "CMakeLists.txt"
);

const original =
  'string(APPEND CMAKE_CXX_FLAGS " -fexceptions -fno-omit-frame-pointer -frtti -fstack-protector-all -std=c++${CMAKE_CXX_STANDARD} -Wall -Werror")';
const patched =
  'string(APPEND CMAKE_CXX_FLAGS " -fexceptions -fno-omit-frame-pointer -frtti -fstack-protector-all -std=c++${CMAKE_CXX_STANDARD} -Wall -Werror -Wno-error=vla-cxx-extension -Wno-error=deprecated-this-capture")';

if (!fs.existsSync(cmakePath)) {
  process.exit(0);
}

const source = fs.readFileSync(cmakePath, "utf8");

if (source.includes(patched)) {
  process.exit(0);
}

if (!source.includes(original)) {
  console.warn("Reanimated CMake warning patch was not applied; expected line was not found.");
  process.exit(0);
}

fs.writeFileSync(cmakePath, source.replace(original, patched));
console.log("Applied Reanimated CMake warning patch for Android NDK 27.");
