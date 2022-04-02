let state = {
  Solv: {
    start_timer: Number, //таймер приемника
    time_data: String, //дата число.месяц.год
    timer: String, //местное время
    coordinates: { latitude: Number, longtude: Number }, //координаты широта долгоа
    height: Number, //высота
    svs: String, //сколько маяков было задействавоно для решения нав.задачи
    res: Number, //среднеквадратическая невязка решения навигационной задачи (насколько бьются измерения между собой)
    modi_ns: String, //поправка к шкале времени
    modi_ms: String, //поправка к шкале скорости
    pdop: Number, //геометрический фактор
    e_distance: Number, //расстояние до базы
    appar_counter: Number, //аппаратный счетчик
  },
  Lct: {
    number: [], //номера существующих маяков
    time_data: [], //дата число.месяц.год
    timer: [], //местное время
    coordinates: { latitude: [], longtude: [] }, //координаты широта долгоа
    height: [], //высота
    resids: [], //невязки
  },
};

export default state;
