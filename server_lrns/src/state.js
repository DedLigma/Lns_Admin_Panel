let state = {
  Change_Check: true,
  Solv: {
    start_timer: Number,
    time_data: String,
    timer: String,
    coordinates: { latitude: Number, longtude: Number },
    height: Number,
    svs: String,
    res: Number,
    modi_ns: String,
    modi_ms: String,
    pdop: Number,
    e_distance: Number,
    appar_counter: Number,
  },
  Lct: {
    number: [],
    time_data: [],
    timer: [],
    coordinates: { latitude: [], longtude: [] },
    height: [],
    resids: [],
  },
};

export default state;