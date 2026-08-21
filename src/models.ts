class MessageABC {
  classes: string[] = [];
  icon: string = "";
  id: string = "";
  images: Image = {};
  name: string = "";
  text: string = "";

  constructor(data: Partial<MessageABC>) {
    Object.assign(this, data);
  }

  addClass(class_: string) {
    this.classes.push(class_);
  }

  findNames(names: string[]) {
    names.forEach((name) => {
      if (this.text.includes(name)) {
        this.addClass("name");
      }
    });
  }

  getClasses(): string {
    return `${this.classes.join(" ")} ${this.id}`;
  }

  process() {}
}

class MessageG extends MessageABC {
  icon = "g.png";
  id = "g";
  premiums: number[] = [];
  reSmile = /:\w+:/gi;

  constructor(data: Partial<MessageG>) {
    super(data);
  }

  addSmile(smileId: string, smileName: string, smiles: SmileG[]): boolean {
    return smiles.some((smile) => {
      if (smile.name === smileName) {
        this.images[smileId] = smile.animated ? smile.img_gif : smile.img_big;
        return true;
      }
      return false;
    });
  }

  process() {
    super.process();
    const m = this.text.match(this.reSmile);
    if (m) {
      m.forEach((smileId) => {
        const smileName = smileId.slice(1, -1);
        const isFound = this.addSmile(smileId, smileName, Global.Smiles);
        if (!isFound) {
          this.premiums.forEach((id) => {
            if (id in Global.Channel_Smiles) {
              this.addSmile(smileId, smileName, Global.Channel_Smiles[id]);
            }
          });
        }
      });
    }
  }
}

class MessageM extends MessageABC {
  id = "m";
  isDonate: boolean = false;
  isEvent: boolean = false;
  isTts: boolean = false;
  name = "Miranda";

  constructor(data: Partial<MessageM>) {
    super(data);
  }
}

class MessageT extends MessageABC {
  color: string = "";
  icon = "t.ico";
  id = "t";

  constructor(data: Partial<MessageT>) {
    super(data);
  }
}

class MessageV extends MessageABC {
  icon = "v.png";
  id = "v";

  constructor(data: Partial<MessageV>) {
    super(data);
  }
}

class MessageY extends MessageABC {
  icon = "y.ico";
  id = "y";

  constructor(data: Partial<MessageY>) {
    super(data);
  }
}

interface DataServer {
  messages: DataServerMessage[];
  names: string[];
  stats: Stats;
  total: number;
  tts_api_key: string;
}

interface DataServerMessage {
  color?: string;
  id: string;
  images: Image;
  isDonate?: boolean;
  isEvent?: boolean;
  isTts?: boolean;
  name: string;
  premiums?: number[];
  text: string;
}

interface SmileG {
  animated: boolean;
  img_big: string;
  img_gif: string;
  name: string;
}

type Image = Record<string, string>;
type Message =
  MessageABC | MessageG | MessageM | MessageT | MessageV | MessageY;
type Stats = Record<string, number | string>;

export {
  MessageABC,
  MessageG,
  MessageM,
  MessageT,
  MessageV,
  MessageY,
  type DataServer,
  type DataServerMessage,
  type Image,
  type Message,
  type Stats,
};
