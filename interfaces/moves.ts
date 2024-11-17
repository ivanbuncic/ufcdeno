export enum MoveType {
  /* 1  */ BLOCKED_STRIKING = "blocked strike",
  /* 2  */ CALF_KICK = "calf kick",
  /* 3  */ CROSS = "cross to the face",
  /* 4  */ DEFENDED_TAKE_DOWN = "defended a take-down",
  /* 5  */ DEFENDED_GRAPPLING = "defended scratching",
  /* 6  */ EYE_POKE = "eye poke",
  /* 7  */ FLYING_KNEE = "flying knee",
  /* 8  */ GROIN_SHOT = "groin shot",
  /* 9  */ GROUND_POUND = "ground and pound",
  /* 10 */ GUILLOTINE_CHOKE = "guillotine choke",
  /* 11 */ HEAD_KICK = "head kick",
  /* 12 */ HOOK = "hook to the dome",
  /* 13 */ ILLEGAL_KNEE = "illegal knee",
  /* 14 */ JAB = "jab to the nose",
  /* 15 */ KIMURA = "kimura",
  /* 16 */ REAR_NAKED_CHOKE = "rear naked choke",
  /* 17 */ SLICING_ELBOW = "slicing elbow",
  /* 18 */ SPINNING_BACK_FIST = "spinning back fist",
  /* 19 */ STANDING_GUILLOTINE_CHOKE = "standing guillotine choke",
  /* 20 */ TAKE_DOWN = "take-down",
  /* 21 */ UPPERCUT = "uppercut to the chin",
  /* 22 */ SPINNING_BACK_KICK = "spinning back kick"
}

export interface Move {
  type: MoveType;
  photo: string;
}
