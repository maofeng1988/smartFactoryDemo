const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const dirList = [
  "./src/factory-demo",
  // "./src/fundamentals-demo",
  // "./src/other-example"
];

const entryObj ={
  index:"./src/index.js"
};
const pluginsList = [
  new CopyPlugin({
    patterns: [
      { from: './static/**/*' }
    ]
  }),
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "./src/index.html",
    chunks: ["index"]
  })
];

// traverse all directory , each directory should include at least two file: index.html,index.js.
dirList.forEach(dir=>{
  fs.readdirSync(dir).forEach(file => {
    entryObj[file] = `${dir}/${file}/index.js`;
    pluginsList.push(
      new HtmlWebpackPlugin({
        filename: `${file}.html`,
        template: `${dir}/${file}/index.html`,
        chunks: [file]
      })
    );
  });
});
// console.log("entryObj:", entryObj);
// console.log("pluginsList", pluginsList);
module.exports = {
  entry: entryObj,
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins:pluginsList

};