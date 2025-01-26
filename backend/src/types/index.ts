export interface WebRTCOffer {
  sdp: string;
  type: 'offer';
}

export interface WebRTCAnswer {
  sdp: string;
  type: 'answer';
}

export interface ClientEvent {
  type: string;
  payload: any;
}

export interface ServerEvent {
  type: string;
  payload: any;
}
