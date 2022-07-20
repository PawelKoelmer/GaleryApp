# GalleryApp

There were problems with React_bridging and react-native-vision-camera
after new release of react native <= 0.69

For start project you need to do 2 easy steps ->

1. After npm install go to /node_modules/react-native/ReactCommon/React-bridging.podspec
   and change line "s.header_dir = "react/bridging" -> s.header_dir = "."

links with solution

- [Bridging solution github](https://github.com/facebook/react-native/issues/34102#issuecomment-1174395110)
