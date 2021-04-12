const fs = require("fs");
const path = require("path");
const document = {};

document.baseDir = path.join(__dirname, "/../data/");

const write = (err, fd, data) => {
  try {
    const dataString = JSON.stringify(data);
    return fs.writeFile(fd, dataString, (err) => close(err, fd));
  } catch {}
};

const truncate = (err, fd, data) => {
  try {
    return fs.ftruncate(fd, (err) => write(err, fd, data));
  } catch {}
};

const close = (err, fd) => {
  try {
    return fs.close(fd, onClose);
  } catch {}
};
const onClose = (err) => {
  try {
  } finally {
    //   Called last
    console.log("closing");

    return "result";
  }
};

const read = (err, data, callback = () => null) => {
  try {
    const parsedData = data ? JSON.parse(data) : {};
    callback(parsedData);
    return parsedData;
  } catch {}
};

document.create = (dir, file, data) => {
  const path = `${document.baseDir + dir}/${file}.json`;
  try {
    fs.open(path, "wx", (err, fd) => write(err, fd, data));
  } catch {}
};

document.createSync = (dir, file, data) => {
  const path = `${document.baseDir + dir}/${file}.json`;
  try {
    fs.openSync(path, "wx", (err, fd) => write(err, fd, data));
  } catch {}
}

document.ammend = async (dir, file, ammendedData, deleteField ) => {
  const path = `${document.baseDir + dir}/${file}.json`;
  try {
    document.read(dir, file, (existingData) => {
      if (deleteField){
        delete existingData[deleteField];
      }
      const data = {
        ...existingData,
        ...ammendedData,
      };

      return fs.open(path, "r+", (err, fd) => truncate(err, fd, data));
    });
  } catch {}
};

document.read = (dir, file, callback) => {
  const path = `${document.baseDir + dir}/${file}.json`;
  try {
    return fs.readFile(path, "utf-8", (err, data) => read(err, data, callback));
  } catch {}
};


document.readSync = (dir, file) => {
  const path = `${document.baseDir + dir}/${file}.json`;
  let data = fs.readFileSync(path, "utf-8");
  data = JSON.parse(data)
  return data;
}

document.write = (dir, file, data) => {
  const path = `${document.baseDir + dir}/${file}.json`;
  try {
    if (fs.existsSync(path)) {
      document.ammend(dir, file, data);
    } else {
      document.create(dir, file, data);
    }
  } catch {}
};


document.rename = ( oldPath, newPath) => {
  try {
    return fs.rename(document.baseDir + oldPath, document.baseDir + newPath, (err) => {
      try {

      }
      catch{}
    })
  }catch {}
}

module.exports = document;
