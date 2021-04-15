const fs = require("fs");
const path = require("path");
const document = {};

document.baseDir = path.join(__dirname, "/../data/");

const write = (err, fd, data, callback) => {
  try {
    const dataString = JSON.stringify(data);
    return fs.writeFile(fd, dataString, (err) => close(err, fd, callback));
  } catch {}
};

const truncate = (err, fd, data) => {
  try {
    return fs.ftruncate(fd, (err) => write(err, fd, data));
  } catch {}
};

const close = (err, fd, callback = () => null) => {
  try {
    fs.close(fd, onClose);
    return callback()
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

document.create = (dir, file, data, callback) => {
  const path = `${document.baseDir + dir}/${file}.json`;
  try {
    fs.open(path, "wx", (err, fd) => write(err, fd, data, callback));
  } catch {}
};

document.createSync = (dir, file, data) => {
  const path = `${document.baseDir + dir}/${file}.json`;
  // console.log("data", data)
  let test = JSON.stringify({"hi": "hey"})
  try {
    fs.writeFileSync(path, test);
  } catch(e) {
    console.log(e)
  }
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
  try {
    const path = `${document.baseDir + dir}/${file}.json`;
    let data = fs.readFileSync(path, "utf-8");
    data = JSON.parse(data)
    return data;
  }
  catch{
    return {}
  }

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
