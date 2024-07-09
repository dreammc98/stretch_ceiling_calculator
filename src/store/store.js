import { createStore } from "vuex";

export const textureArr = ["ПВХ", "Тканевый"];
export const colorArr = ["Белый", "Цветной"];

export default createStore({
  state: {
    textureArr: textureArr,
    colorArr: colorArr,
    rooms: [
      {
        id: 1,
        title: "Комната №1",
        inputs: { area: 10, corners: 4, texture: textureArr[0], color: colorArr[0] },
      },
    ],
    selectedRoomId: 1,
    warning: false,
    isModal: false,
  },
  mutations: {
    addRoom(state, room) {
      state.rooms.push(room);
    },
    setSelectedRoomId(state, roomId) {
      state.selectedRoomId = roomId;
    },
    decrementInput(state, property) {
      const room = state.rooms.find((room) => room.id === state.selectedRoomId);
      if (room) {
        if (room.inputs[property] === 10 && property === "area") {
          room.inputs[property] = 10;
          state.warning = "Площать ";
          return;
        }
        if (room.inputs[property] === 1 && property === "corners") {
          room.inputs[property] = 1;
          return;
        }
        room.inputs[property] -= 1;
      }
    },
    increaseInput(state, property) {
      const room = state.rooms.find((room) => room.id === state.selectedRoomId);
      if (room) {
        room.inputs[property] += 1;
      }
    },

    toggleModal(state, isMod) {
      state.isModal = isMod;
    },
    roomDelete(state) {
      state.rooms = state.rooms.filter((room) => room.id !== state.selectedRoomId);
      state.selectedRoomId = state.rooms[0].id;
      console.log(state.rooms[0].id);
    },
  },
  actions: {
    addRoomAndSelect({ commit, state }) {
      const newRoom = {
        id: state.rooms.length + 1,
        title: `№${state.rooms.length + 1}`,
        inputs: { area: 10, corners: 4, texture: state.textureArr[0], color: state.colorArr[0] },
      };
      commit("addRoom", newRoom);
      commit("setSelectedRoomId", newRoom.id);
    },

    selectRoom({ commit }, roomId) {
      commit("setSelectedRoomId", roomId);
    },
  },
  getters: {},
});
