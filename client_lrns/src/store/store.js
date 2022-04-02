let renderEntireTree = () => {}

window.renderEntireTree = renderEntireTree



let state_fetch = async () => {
  const response = await fetch("http://localhost:3001/state");
  const state = await response.json();
  return state;
};

//проверяем есть ли изменения данных 
let old_data;

setInterval(async () => {
    const response = await fetch("http://localhost:3001/change");
    const data = await response.text();
    if (old_data != data) {
      old_data = data
      renderEntireTree(state_fetch());
    }
  }, 500);


export const subscribe = (observer) => {
    renderEntireTree = observer;
};