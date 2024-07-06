export enum MoveType {
  /* 1  */ BLOCKED_STRIKING = "blocked",
  /* 2  */ CALF_KICK = "calf kick",
  /* 3  */ CROSS = "cross",
  /* 4  */ DEFENDED_TAKE_DOWN = "defended a take-down",
  /* 5  */ DEFENDED_GRAPPLING = "defended",
  /* 6  */ EYE_POKE = "eye poke",
  /* 7  */ FLYING_KNEE = "flying knee",
  /* 8  */ GROIN_SHOT = "groin shot",
  /* 9  */ GROUND_POUND = "ground and pound",
  /* 10 */ GUILLOTINE_CHOKE = "guillotine choke",
  /* 11 */ HEAD_KICK = "head kick",
  /* 12 */ HOOK = "hook",
  /* 13 */ ILLEGAL_KNEE = "illegal knee",
  /* 14 */ JAB = "jab",
  /* 15 */ KIMURA = "kimura",
  /* 16 */ REAR_NAKED_CHOKE = "rear naked choke",
  /* 17 */ SLICING_ELBOW = "slicing elbow",
  /* 18 */ SPINNING_BACK_FIST = "spinning back fist",
  /* 19 */ STANDING_GUILLOTINE_CHOKE = "standing guillotine choke",
  /* 20 */ TAKE_DOWN = "take-down",
  /* 21 */ UPPERCUT = "uppercut",
}

export interface Move {
  type: MoveType;
  photo: string;
}
