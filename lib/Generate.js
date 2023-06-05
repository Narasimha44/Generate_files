const fs = require("fs");
const path = require("path");

function GenerateFolderFiles(filepath, folderPath, content, fin_name) {
  let path1 = path.join(folderPath, "hooks");
  let path2 = path.join(folderPath, "utils");
  let path3 = path.join(folderPath, `index.tsx`);
  let path4 = path.join(folderPath, "styles.module.css");
  let path5 = path.join(path1, "index.ts");
  let path6 = path.join(path2, "index.ts");

  fs.mkdirSync(path1);
  fs.mkdirSync(path2);
  fs.writeFileSync(path5, "export class Index{}");
  fs.writeFileSync(path6, "export class Index{}");
  fs.writeFileSync(path3, content);
  fs.writeFileSync(path4, ".container{\n\n}");
}

function createfolderfiles(filepath) {
  let folders = filepath.split("/");
  let folders2 = ["src"];
  for (let fol of folders) {
    folders2 = [...folders2, fol];
  }

  let len = folders.length;
  let fin_name = folders[len - 1];

  let fin_name2 = fin_name.charAt(0).toUpperCase() + fin_name.slice(1);

  let folderpath;

  let ran = __dirname;

  let Pet = ran.split("\\");

  let target = [];
  let temp = false;
  for (let pet of Pet) {
    if (temp == false && pet != "node_modules") {
      target.push(pet);
    } else {
      temp = true;
    }
  }
  let targetPath = target.join("/");

  folderpath = folders2.reduce((acc, folder) => {
    let curr_fold = path.join(acc, folder);
    if (!fs.existsSync(curr_fold)) {
      fs.mkdirSync(curr_fold);
    }
    return curr_fold;
  }, targetPath);

  const filecon =
    `import React,{ useEffect, useState } from \'react\'; \n\n` +
    `import styles from \'./styles.module.css\'; \n` +
    `\n` +
    `interface IAppProps {} \n` +
    `\n` +
    `\n` +
    `const ${fin_name2} = (props: I${fin_name2}Props) => { \n` +
    `\n` +
    "const {}= props; \n" +
    `\n` +
    `  const [state, setState] = useState();\n` +
    `  const [loaded, setLoaded] = useState(false);\n` +
    `\n` +
    `  useEffect(() => {\n \n  }, []);\n` +
    `\n` +
    "  const fetchData = async () => { \n" +
    `    try { \n` +
    `      setLoaded(true);\n` +
    `      //call API here\n` +
    `    } catch (err) { \n` +
    `      console.log(err); \n` +
    `    } finally { \n` +
    `      setLoaded(false); \n    } \n  } \n  return <div className={styles.container}>Hello world!</div>; \n}; \n \nexport default ${fin_name}; `;

  GenerateFolderFiles(filepath, folderpath, filecon, fin_name);
}

let inputpath = process.argv[2];
createfolderfiles(inputpath);
