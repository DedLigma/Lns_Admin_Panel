import express from "express";
import fs from "fs";
import state from "./src/state.js";

const PORT = process.env.PORT || 3001;
const app = express();

let srnsPath = "./src/srns_0x0003.txt"; //путь к файлу

let how_much_el_delete; //количество удаляемых из массива элементов
let Main_Data; //считанные данные из файла
let Main_Data_Arr = []; //считанные данные разбитые по строкам
let Solv_Data = []; //набор строчек с Solv
let Lct_Data = []; //набор строчек Lct
let Last_Solv_String = []; //последняя строчка с Solv
let Lct_Data_Split = []; //массив lct с разбивкой строчек
let resids_arr = []; //массив для перегонки невязок в state
let is_it_change = 1;
let number_of_element;

//первичный запуск
Main_Data = File_Reader_Function(); //читаем файл
Main_Function(Main_Data);

//метод, следящий за изменением файла
//в случае если fs.watch не работает, использовать fs.watchFile
fs.watchFile(srnsPath, { interval: 100 }, () => {
  // fs.watch(srnsPath, () => {
  Main_Data = File_Reader_Function(); //читаем файл
  Main_Function(Main_Data);
});

//основная функция
function Main_Function(Main_Data) {
  //очищаем данные
  Main_Data_Arr = [];
  Solv_Data = [];
  Lct_Data = [];
  Last_Solv_String = [];
  Lct_Data_Split = [];
  resids_arr = [];

  Main_Data_Arr = Main_Data.split("\n"); //разбиение на массив. одна строка - один элемент массива
  console.log("split done");

  how_much_el_delete = Main_Data_Arr.length - 350; //сколько строк с конца будет обработано

  Main_Data_Arr.splice(0, how_much_el_delete); //зачистка массива с последнего элемента
  console.log("array ready for work");

  //обработка Solv
  Solv_Data = String_Word_Filter(Main_Data_Arr, "Solv"); //фильтруем массив на Solv

  Last_Solv_String = Solv_Data.splice(-1)[0].split(" "); //делим последнюю строчку с Solv на отдельные слова

  //занесение данных Solv в state
  Making_Solv_State(Last_Solv_String);

  //обработка Lct
  Lct_Data = String_Word_Filter(Main_Data_Arr, "Lct");

  //разбиваем lct строки на отдельные элементы
  Lct_Data.forEach((el) => {
    Lct_Data_Split.push(el.split(" "));
  });

  Making_Lct_State(Lct_Data_Split);

  The_Send(state, "/state");

  is_it_change = -is_it_change;
  app.get("/change", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "origin, content-type, accept"
    );
    console.log("\x1b[36m%s\x1b[0m", `was send on /change`);
    res.send(`${is_it_change}`);
  });
}

//функция для чтения файла и занесения считанного в Main_Data
function File_Reader_Function() {
  let Was_Read = fs.readFileSync(srnsPath, "utf-8"); //чтение файла. тип - string
  console.log("File was read");
  return Was_Read;
}

//занесение данных из последний строки Solv в state
function Making_Solv_State(Last_Solv_String) {
  state.Solv.start_timer = Number(Last_Solv_String[2]);
  state.Solv.time_data = String(Last_Solv_String[5]);
  state.Solv.timer = String(Last_Solv_String[6]);
  state.Solv.coordinates.latitude = parseFloat(Last_Solv_String[7]);
  state.Solv.coordinates.longtude = Number(Last_Solv_String[8]);
  state.Solv.height = +/\d+.\d+/.exec(Last_Solv_String[10]); //тут в общем регулярное выражение чтоб достать число с плавающей точкой. капец круто написано да?
  state.Solv.svs = String(Last_Solv_String[12]);
  state.Solv.res = +/\d+.\d+/.exec(Last_Solv_String[14]);
  state.Solv.modi_ms = String(Last_Solv_String[16]);
  state.Solv.modi_ns = String(Last_Solv_String[18]);
  state.Solv.pdop = +/\d+.\d+/.exec(Last_Solv_String[20]);
  state.Solv.e_distance = +/\d+.\d+/.exec(Last_Solv_String[21]);
  state.Solv.appar_counter = Number(Last_Solv_String[24]);
}

function Making_Lct_State(Lct_Data_Split) {
  //очищаем state.Lct, чтобы не остались старые маяки
  state.Lct.number = [];
  state.Lct.time_data = [];
  state.Lct.timer = [];
  state.Lct.coordinates.latitude = [];
  state.Lct.coordinates.longtude = [];
  state.Lct.height = [];
  state.Lct.resids = [];

  //вносим уникальные номера в state
  Lct_Data_Split.forEach((el) => {
    el[2] = +el[2];
    el[11] = +el[11];
    if (!state.Lct.number.includes(el[11])) {
      state.Lct.number.push(el[11]);
    }
  });
  state.Lct.number.sort((a, b) => a - b);

  Lct_Data_Split.forEach((split_el) => {
    //занесение координат

    if (split_el.includes("NavMsgLctLxOCoord")) {
      state.Lct.coordinates.latitude[split_el[11]] = +/\d+.\d+/.exec(
        split_el[14]
      );
      state.Lct.coordinates.longtude[split_el[11]] = +/\d+.\d+/.exec(
        split_el[15]
      );
      state.Lct.height[split_el[11]] = +/\d+.\d+/.exec(split_el[16]);
    }
    //занесение времени
    else if (split_el.includes("NavMsgLctLxONewFrame:")) {
      state.Lct.time_data[split_el[11]] = split_el[17];
      state.Lct.timer[split_el[11]] = split_el[18];
    }
    //занесение невязок
    else if (split_el.includes("NavMsgLctLxOResids")) {
      //первая невязка [14]
      state.Lct.resids[split_el[11]] = split_el[11];
      
      +split_el.splice(19, 1); //удаляем 19 элемент, тк он пустой
      for (number_of_element in split_el.slice(14)) {
        resids_arr[+number_of_element + 1] =
          +split_el.slice(14)[+number_of_element];
        state.Lct.resids[split_el[11]] = resids_arr;
      }
      resids_arr = []; //сбрасываем массив
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//фильтр для массивов
//формирует новый массив, в каждом из элементов которого содержится 'filter_word'
function String_Word_Filter(My_Arr, filter_word) {
  let New_Arr = My_Arr.filter((str) => str.indexOf(filter_word) > 0);
  return New_Arr;
}

//отправляет объект message по адресу adress
function The_Send(state, adress) {
  app.get(adress, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "origin, content-type, accept"
    );
    console.log("\x1b[36m%s\x1b[0m", `was send on ${adress}`);
    res.send({ state });
  });
}
