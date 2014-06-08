# Panache

Panache is (in the process of becoming) a multiplatform image viewer and
organizer. It was concieved because I never found a good, free, open-source, 
image viewer for Linux and Mac.

More on the UI and functionalities can be found in the [wiki](wiki).

Panache runs on [node-webkit](https://github.com/rogerwang/node-webkit/), and as
such is (currently) built completely with web technologies. The UI is built,
among others, with [AngularJS](http://angularjs.org). Local file system access
is achieved by combining NodeJS call's inside Angular's modules. More on the
integration between NodeJS and Webkit can be found in
[node-webkit's wiki](https://github.com/rogerwang/node-webkit/wiki).

Currently images are read directly from the file system with base64 encoding
and processed using Webkit's resources (HTML5's canvas, DOM images, etc.).
When reading many images, or when large images are processed, this can be slow.
Most of the processing could be done in NodeJS, while using Webkit only for the
final result; but this will require using external image processing NodeJS
modules. There are a few out there, but all those that I have seen require
external dependencies, which I would like to avoid. In the future, NodeJS
native modules might be developed (as part of this project) to facilitate and
speed-up image loading and processing.
