const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createAt: ""
}

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "accounts/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createAt: action.payload.createAt,
      };
    case "accounts/updateName":
      return {
        ...state,
        fullName: action.payload.fullName,
      }
    default:
      return state;
  }
}


export function createCustomer(fullName, nationalID) {
  return {type: "accounts/createCustomer", payload: {fullName, nationalID, createAt: new Date().toISOString()}};
}

export function updateName(fullName) {
  return {type: "accounts/updateName", payload: {fullName}}
}
