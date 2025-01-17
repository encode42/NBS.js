import type { Mutable } from "~/util/Mutable";

/**
 * Structure of {@linkcode builtInBuilder}.
 *
 * @category Instrument
 * @internal
 */
export interface BuiltInBuilder {
	/**
	 * ID-instrument pair.
	 */
	[id: number]: {
		/**
		 * {@inheritDoc Instrument#name}
		 */
		"name": string;

		/**
		 * {@inheritDoc Instrument#soundFile}
		 */
		"soundFile": string;
	};
}

/**
 * Used to construct {@linkcode Instrument.builtIn}.
 *
 * @satisfies {BuiltInBuilder}
 * @category Instrument
 * @internal
 */
export const builtInBuilder: BuiltInBuilder = {
	0: {
		"name": "Harp",
		"soundFile": "harp.ogg"
	},
	1: {
		"name": "Double Bass",
		"soundFile": "dbass.ogg"
	},
	2: {
		"name": "Bass Drum",
		"soundFile": "bdrum.ogg"
	},
	3: {
		"name": "Snare Drum",
		"soundFile": "sdrum.ogg"
	},
	4: {
		"name": "Click",
		"soundFile": "click.ogg"
	},
	5: {
		"name": "Guitar",
		"soundFile": "guitar.ogg"
	},
	6: {
		"name": "Flute",
		"soundFile": "flute.ogg"
	},
	7: {
		"name": "Bell",
		"soundFile": "bell.ogg"
	},
	8: {
		"name": "Chime",
		"soundFile": "icechime.ogg"
	},
	9: {
		"name": "Xylophone",
		"soundFile": "xylobone.ogg"
	},
	10: {
		"name": "Iron Xylophone",
		"soundFile": "iron_xylophone.ogg"
	},
	11: {
		"name": "Cow Bell",
		"soundFile": "cow_bell.ogg"
	},
	12: {
		"name": "Didgeridoo",
		"soundFile": "didgeridoo.ogg"
	},
	13: {
		"name": "Bit",
		"soundFile": "bit.ogg"
	},
	14: {
		"name": "Banjo",
		"soundFile": "banjo.ogg"
	},
	15: {
		"name": "Pling",
		"soundFile": "pling.ogg"
	}
} as const;

/**
 * Every built-in instrument.
 *
 * @see {@linkcode Instrument.builtIn}
 * @category Instrument
 */
export type BuiltIn = {
	[Id in keyof typeof builtInBuilder]: Instrument;
};

/**
 * Options available for an {@linkcode Instrument}.
 *
 * @category Instrument
 */
export interface InstrumentOptions {
	/**
	 * {@inheritDoc Instrument#name}
	 */
	"name"?: string;

	/**
	 * {@inheritDoc Instrument#soundFile}
	 */
	"soundFile"?: string;

	/**
	 * {@inheritDoc Instrument#key}
	 */
	"key"?: number;

	/**
	 * {@inheritDoc Instrument#pressKey}
	 */
	"pressKey"?: boolean;
}

/**
 * Default {@linkcode Instrument} values.
 *
 * @category Instrument
 */
export const defaultInstrumentOptions: InstrumentOptions = {
	"name": "",
	"soundFile": "",
	"key": 45,
	"pressKey": false
};

/**
 * Represents an instrument of a {@linkcode Note}.
 *
 * @includeExample ./examples/design/instrument.ts
 * @category Highlights
 * @category Instrument
 */
export class Instrument {
	/**
	 * Instruments built into Note Block Studio.
	 */
	public static readonly builtIn: BuiltIn = Object.fromEntries(
		Object.entries(builtInBuilder).map(([id, value]) => {
			const instrument = new this(value) as Mutable<Instrument>;

			if (value.name === "Harp") {
				instrument.pressKey = true;
			}

			instrument.isBuiltIn = true;

			return [id, instrument];
		})
	);

	/**
	 * Whether the instrument is a built-in instrument.
	 *
	 * @internal
	 */
	public readonly isBuiltIn: boolean = false;

	/**
	 * Name of the instrument.
	 */
	public name?: string;

	/**
	 * Sound file of the instrument.
	 *
	 * @remarks Relative to the `Data/Sounds/` directory of Note Block Studio installations.
	 * @see
	 * This property is not used within `nbs.js` for anything other than storage.
	 *
	 * It only exists to work with other applications that implement functionality.
	 */
	public soundFile: string;

	/**
	 * Key of the sound file.
	 *
	 * @remarks Just like note blocks, this ranges from 0-87.
	 *
	 * @see {@linkcode Note#key}
	 */
	public key = defaultInstrumentOptions.key;

	/**
	 * Whether the on-screen piano should visually press keys when these notes are played.
	 */
	public pressKey = defaultInstrumentOptions.pressKey;

	/**
	 * Construct an instrument.
	 *
	 * @param options Options for the instrument
	 */
	public constructor(options = defaultInstrumentOptions) {
		const mergedOptions = {
			...defaultInstrumentOptions,
			...options
		};

		this.name = mergedOptions.name ?? defaultInstrumentOptions.name;
		this.soundFile = mergedOptions.soundFile ?? defaultInstrumentOptions.soundFile;
		this.pressKey = mergedOptions.pressKey ?? defaultInstrumentOptions.pressKey;
		this.key = mergedOptions.key ?? defaultInstrumentOptions.key;
	}
}
