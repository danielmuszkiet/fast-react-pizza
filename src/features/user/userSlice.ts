import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
import type { RootState } from "../../store";

function getPosition() {
  return new Promise<GeolocationPosition>(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

type Position = {
  latitude: number;
  longitude: number;
};

interface TUser {
  userName: string;
  status: "idle" | "loading" | "error";
  position: Position | null;
  address: string;
  error?: string;
}

export const fetchAddress = createAsyncThunk(
  "users/fetchAdress",

  async () => {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position: Position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's
    // address, so we can display it the order form, so that the user can correct
    // it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  },
);

const initialState: TUser = {
  userName: "",
  status: "idle",
  position: null,
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
        state.error = "";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.address = "";
        state.error = "Error, Please provide address yourself.";
      });
  },
});

export const selectUsername = (state: RootState) => state.user.userName;
export const selectAdress = (state: RootState) => state.user.address;

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
