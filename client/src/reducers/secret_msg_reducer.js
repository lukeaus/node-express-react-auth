import { FETCH_SECRET_MESSAGE } from '../actions/types';

export default function(state = '', payload) {
  switch (payload.type) {
  case FETCH_SECRET_MESSAGE:
    return payload.data;
  }
  return state;
}
