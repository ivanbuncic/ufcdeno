export enum MoveType {
    JUMPING = "jumping arround",
    REAR_NAKED_CHOKE = "rear naked choke",
    GUILLOTINE_CHOKE = "guillotine choke",
    TRIANGLE_CHOKE = "triangle choke",
    KIMURA = "kimura",
    STANDING_GUILLOTINE_CHOKE = "standing guillotine choke",
    DEFENDED_GRAPPLING = "defended",
    JAB = "jab",
    CROSS = "cross",
    HOOK = "hook",
    UPPERCUT = "uppercut",
    ELBOW = "slicing elbow",
    SPINNING_BACK_FIST = "spinning back fist",
    HEAD_KICK = "head kick",
    CALF_KICK = "calf kick",
    FLYING_KNEE = "flying knee",
    BLOCKED_STRIKING = "blocked",
    TAKE_DOWN = "take-down",
    TAKE_DOWN_ATTEMPT = "take-down attempt",
    DEFENDED_TAKE_DOWN = "defended a take-down",
    EYE_POKE = "eye poke",
    GROIN_SHOT = "groin shot",
    ILLEGAL_KNEE = "illegal knee"
  }
  
  export interface Move {
    type: MoveType;
    photo: string;
  }
  