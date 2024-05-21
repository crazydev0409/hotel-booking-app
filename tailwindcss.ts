import { create } from "twrnc";

export const theme = {
  content: ["./src/navigation/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        'abril': 'AbrilFatface-Regular',
        'dm': 'DMSans'
      },
    }
  }
};

const tw = create(theme);

export default tw;
