import { takeLatest } from 'redux-saga/effects'

//import { findObjectByID } from '../api/AssetSearchService';

async function callFindObjectByID(id) {
  try {
  } catch (error) {
    console.log(error)
    return ({ error });
  }
}


function* AssetSearchbarSaga() {
  yield takeLatest("SEARCH_OBJECT_BY_ID", callFindObjectByID);
}

export default AssetSearchbarSaga;