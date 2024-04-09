export interface Ibasics {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface IProfile extends Ibasics {
  profileName: string;
  linkIcon: boolean;
}

export interface ISeries extends Ibasics {
  name: string;
  productionCompany: string;
  linkTrailer: string;
  linkCover: string;
  gender: string[];
  classification: string;
  description: string;
}

export interface IMovies extends Ibasics {
  name: string;
  productionCompany: string;
  linkTrailer: string;
  linkCover: string;
  linkMovie: string;
  gender: string[];
  classification: string;
  description: string;
}

export interface IContent {
  comedy: ISeries[];
  action: ISeries[];
  drama: ISeries[];
  scifi: ISeries[];
  romantic: ISeries[];
  fantasy: ISeries[];
  terror: ISeries[];
  documental: ISeries[];
  realityShow: ISeries[];
  standUp: ISeries[];
  talkShow: ISeries[];
  mistery: ISeries[];
  anime: ISeries[];
  movie: IMovies;
}
