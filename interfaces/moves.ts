export enum MoveType {
  BLOCKED_STRIKING = "blocked",
  CALF_KICK = "calf kick",
  CROSS = "cross",
  DEFENDED_GRAPPLING = "defended",
  DEFENDED_TAKE_DOWN = "defended a take-down",
  ELBOW = "slicing elbow",
  EYE_POKE = "eye poke",
  FLYING_KNEE = "flying knee",
  GROIN_SHOT = "groin shot",
  GROUND_POUND = "ground and pound",
  GUILLOTINE_CHOKE = "guillotine choke",
  HEAD_KICK = "head kick",
  HOOK = "hook",
  ILLEGAL_KNEE = "illegal knee",
  JAB = "jab",
  KIMURA = "kimura",
  REAR_NAKED_CHOKE = "rear naked choke",
  SPINNING_BACK_FIST = "spinning back fist",
  STANDING_GUILLOTINE_CHOKE = "standing guillotine choke",
  TAKE_DOWN = "take-down",
  TRIANGLE_CHOKE = "triangle choke",
  UPPERCUT = "uppercut"  
  }
  
  export interface Move {
    type: MoveType;
    photo: string;
  }
  