import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("game/Game");
export const apiCallSuccess = createAction("game/Success");
export const apiCallFailed = createAction("game/Failed");
