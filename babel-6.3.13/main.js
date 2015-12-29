define(function (require, exports, module) {

  var DocumentManager = brackets.getModule('document/DocumentManager'),
    babel = require('babel-6.3.13.min');

  DocumentManager.on('documentSaved', function () {
    var doc = DocumentManager.getCurrentDocument();
    var file = {
      parentPath: doc.file._parentPath,
      name: doc.file._name.split('.')[0],
      ext: doc.file._name.split('.').pop(),
      contents: doc.file._contents
    };

    var babelOptions = {
      "presets": ["es2015", "react"],
      "sourceMaps": true
    };

    switch (file.ext) {
      case 'jsx':
        brackets.fs.writeFile(
          file.parentPath + file.name + '-jsx.js',
          babel.transform(file.contents, babelOptions).code,
          'utf8'
        );
        console.log(file.ext);
        break;
      case 'es6':
        brackets.fs.writeFile(
          file.parentPath + file.name + '-es5.js',
          babel.transform(file.contents, babelOptions).code,
          'utf8'
        );
        console.log(file.ext);
        break;
    }
  });
});