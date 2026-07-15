import { Quiz } from "./types";

export const PRESET_QUIZZES: { [topic: string]: Quiz } = {
  "Quantum Physics": {
    quizTitle: "Quantum Mechanics: The Physics of the Microscopic World",
    topic: "Quantum Physics",
    difficulty: "Advanced",
    questions: [
      {
        questionNumber: 1,
        questionText: "Which phenomenon is primarily responsible for the stability of matter, preventing electrons from falling into the atomic nucleus?",
        questionType: "MultipleChoice",
        options: [
          "Heisenberg Uncertainty Principle",
          "Pauli Exclusion Principle",
          "Coulomb Dispersion Principle",
          "Einstein-Podolsky-Rosen Effect"
        ],
        correctAnswer: "Pauli Exclusion Principle",
        difficultyRating: 7,
        hint: "This principle dictates that two identical fermions cannot occupy the same quantum state simultaneously.",
        detailedExplanation: "The Pauli Exclusion Principle states that no two identical fermions (such as electrons) can occupy the same quantum state simultaneously. In atoms, this prevents all electrons from collapsing into the lowest energy level (the 1s shell) and eventually into the nucleus. This structural scaling forms the basis of chemistry and the physical volume of matter."
      },
      {
        questionNumber: 2,
        questionText: "True or False: Quantum entanglement allows for the transmission of digital data or information faster than the speed of light.",
        questionType: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "False",
        difficultyRating: 6,
        hint: "Consider the No-Communication Theorem in quantum information theory.",
        detailedExplanation: "Although quantum entanglement creates instantaneous correlation between two particles regardless of distance, it cannot be used to transmit usable information faster than light. To interpret the state of an entangled particle, classical communication (which is limited by the speed of light) is always required. This is formally known as the No-Communication Theorem."
      },
      {
        questionNumber: 3,
        questionText: "In the famous Double-Slit experiment, what happens to the interference pattern on the detector screen when a measurement device is placed to detect which slit each photon goes through?",
        questionType: "MultipleChoice",
        options: [
          "The interference pattern is reinforced and becomes sharper.",
          "The interference pattern shifts laterally but remains intact.",
          "The interference pattern collapses, leaving two distinct single-slit bands.",
          "The interference pattern turns into a uniform isotropic wash."
        ],
        correctAnswer: "The interference pattern collapses, leaving two distinct single-slit bands.",
        difficultyRating: 6,
        hint: "Measuring which path a particle takes destroys its wave-like superposition.",
        detailedExplanation: "Measuring 'which-way' information destroys the quantum coherence and wave-like superposition of the photon. This collapse of the wave function causes the particles to behave purely like classical bullets, eliminating the wave interference pattern and leaving two distinct, localized single-slit bands on the detector screen."
      },
      {
        questionNumber: 4,
        questionText: "What does the square of the absolute value of a quantum wave function (|ψ|²) represent according to the Born Rule?",
        questionType: "MultipleChoice",
        options: [
          "The exact instantaneous velocity of the particle.",
          "The exact relativistic mass of the particle.",
          "The probability density of finding the particle at a given point in space.",
          "The local curvature of spacetime surrounding the particle."
        ],
        correctAnswer: "The probability density of finding the particle at a given point in space.",
        difficultyRating: 5,
        hint: "Think about Max Born's major probabilistic contribution to quantum mechanics.",
        detailedExplanation: "Formulated by physicist Max Born in 1926, the Born Rule states that the probability density of finding a particle at a specific position and time is proportional to the square of the magnitude of its wave function (|ψ|²). This shifted physics from deterministic trajectories to probabilistic wave mechanics."
      },
      {
        questionNumber: 5,
        questionText: "True or False: The photoelectric effect, explained by Albert Einstein using light quanta, proved that light behaves exclusively as a continuous classical wave.",
        questionType: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "False",
        difficultyRating: 4,
        hint: "Einstein won his Nobel Prize for explaining how light behaves like discrete packets of energy.",
        detailedExplanation: "The photoelectric effect demonstrated that light interacts with matter as discrete packets of energy (quanta or photons), not as continuous waves. This explanation by Einstein in 1905 was a pivotal catalyst for quantum theory, proving wave-particle duality."
      }
    ]
  },
  "Astrophysics & Black Holes": {
    quizTitle: "Astrophysics & Black Holes: Cosmic Singularity & Spacetime Dynamics",
    topic: "Astrophysics & Black Holes",
    difficulty: "Advanced",
    questions: [
      {
        questionNumber: 1,
        questionText: "What is the boundary surrounding a black hole beyond which the escape velocity exceeds the speed of light?",
        questionType: "MultipleChoice",
        options: [
          "The Schwarzschild Singularity",
          "The Event Horizon",
          "The Ergosphere Limit",
          "The Roche Lobe Limit"
        ],
        correctAnswer: "The Event Horizon",
        difficultyRating: 5,
        hint: "It represents the point of no return for matter and radiation.",
        detailedExplanation: "The Event Horizon is the theoretical boundary around a black hole where the escape velocity matches the speed of light. Since nothing can travel faster than light, any matter or radiation crossing this boundary is irreversibly drawn toward the central singularity."
      },
      {
        questionNumber: 2,
        questionText: "What theoretical radiation is predicted to be emitted by black holes due to quantum vacuum fluctuations near the event horizon?",
        questionType: "MultipleChoice",
        options: [
          "Hawking Radiation",
          "Penrose Synchrotron Emission",
          "Chandrasekhar Bremsstrahlung",
          "Schwarzschild Blackbody Glow"
        ],
        correctAnswer: "Hawking Radiation",
        difficultyRating: 7,
        hint: "Named after the brilliant British theoretical physicist who formulated it in 1974.",
        detailedExplanation: "Hawking Radiation is a theoretical thermal radiation predicted to be emitted by black holes due to quantum effects near the event horizon. Virtual particle-antiparticle pairs are constantly created from vacuum fluctuations; if one falls into the black hole while the other escapes, the escaping particle appears as radiation, causing the black hole to slowly lose mass and eventually evaporate."
      },
      {
        questionNumber: 3,
        questionText: "True or False: The 'Ergosphere' is a region outside a rotating (Kerr) black hole where spacetime itself is dragged in the direction of rotation, forcing all physical objects to rotate with it.",
        questionType: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "True",
        difficultyRating: 8,
        hint: "This phenomenon is related to 'frame-dragging' or the Lense-Thirring effect.",
        detailedExplanation: "In a rotating (Kerr) black hole, the region between the outer event horizon and the stationary limit is called the Ergosphere. Here, frame-dragging is so intense that spacetime is dragged along with the rotation of the black hole. It is physically impossible for an object to remain stationary in this zone."
      },
      {
        questionNumber: 4,
        questionText: "Which stellar mass limit dictates whether a collapsing star's remnant will become a neutron star or collapse further into a stellar black hole?",
        questionType: "MultipleChoice",
        options: [
          "The Chandrasekhar Limit",
          "The Tolman-Oppenheimer-Volkoff (TOV) Limit",
          "The Eddington Luminosity Limit",
          "The Schwarzschild Radius"
        ],
        correctAnswer: "The Tolman-Oppenheimer-Volkoff (TOV) Limit",
        difficultyRating: 8,
        hint: "While Chandrasekhar represents white dwarf collapse, this limit represents neutron star collapse.",
        detailedExplanation: "The Tolman-Oppenheimer-Volkoff (TOV) limit, roughly 2.17 solar masses, represents the maximum mass that a cold, non-rotating neutron star can support before its neutron degeneracy pressure is overwhelmed by gravity, causing it to collapse into a stellar black hole."
      },
      {
        questionNumber: 5,
        questionText: "True or False: Time runs faster for an observer who is situated extremely close to a black hole's event horizon compared to an observer far out in empty space.",
        questionType: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "False",
        difficultyRating: 5,
        hint: "Recall Einstein's Theory of General Relativity regarding gravitational potential.",
        detailedExplanation: "According to General Relativity, gravity causes time dilation. Time runs slower in regions of stronger gravitational potential (closer to the black hole) compared to an observer situated in flat space far away. To a distant observer, clocks near the event horizon appear to tick at a crawl."
      }
    ]
  },
  "JavaScript Closures & Async": {
    quizTitle: "Advanced JavaScript: Closures, Call Stacks, & Asynchronous Runtime Engine",
    topic: "JavaScript Closures & Async",
    difficulty: "Advanced",
    questions: [
      {
        questionNumber: 1,
        questionText: "What is a JavaScript closure?",
        questionType: "MultipleChoice",
        options: [
          "A method that explicitly terminates a running async process.",
          "A function bundled together with references to its surrounding lexical environment.",
          "A compilation tool that minifies variable scopes during runtime optimization.",
          "A strict mode feature that prevents the modification of global variables."
        ],
        correctAnswer: "A function bundled together with references to its surrounding lexical environment.",
        difficultyRating: 5,
        hint: "It allows an inner function to remember variables declared in its outer scope even after the outer function has executed.",
        detailedExplanation: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created, at function creation time, allowing the function to retain access to variables in its outer scope even after that outer scope has exited."
      },
      {
        questionNumber: 2,
        questionText: "Which component of the V8 engine is responsible for executing microtasks (such as Promise callbacks) before macrotasks (such as setTimeout)?",
        questionType: "MultipleChoice",
        options: [
          "The Call Stack",
          "The Garbage Collector",
          "The Microtask Queue",
          "The Web API Thread Pool"
        ],
        correctAnswer: "The Microtask Queue",
        difficultyRating: 7,
        hint: "Promise callbacks belong here, and this queue is completely emptied after every execution of the main call stack.",
        detailedExplanation: "The Event Loop prioritizes the Microtask Queue over the Macrotask (Callback) Queue. After a task completes on the Call Stack, the Event Loop will continuously execute and empty all microtasks (Promises, process.nextTick, MutationObserver) before picking up the next macrotask (setTimeout, setInterval)."
      },
      {
        questionNumber: 3,
        questionText: "True or False: If you execute a setTimeout with a delay of 0ms, JavaScript guarantees that the callback will run immediately before any other synchronous lines of code.",
        questionType: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "False",
        difficultyRating: 6,
        hint: "Even with 0ms, setTimeout callbacks must pass through the event loop's task queue.",
        detailedExplanation: "Even with a 0ms delay, calling setTimeout pushes the callback onto the Task Queue (macrotasks). The engine cannot run items from this queue until the currently executing synchronous code in the Call Stack has fully completed. Thus, any remaining synchronous code will always execute first."
      },
      {
        questionNumber: 4,
        questionText: "What is the primary difference between let/const and var regarding hoisting?",
        questionType: "MultipleChoice",
        options: [
          "var variables are not hoisted, while let/const variables are fully hoisted.",
          "let/const variables are hoisted to the block level but are placed in a Temporal Dead Zone until initialized.",
          "var variables are hoisted to the window object and are assigned a boolean default.",
          "let/const do not participate in hoisting at all, failing compilation if accessed early."
        ],
        correctAnswer: "let/const variables are hoisted to the block level but are placed in a Temporal Dead Zone until initialized.",
        difficultyRating: 6,
        hint: "Both var and let/const are technically hoisted, but accessing let/const early throws a ReferenceError.",
        detailedExplanation: "Both var and let/const are hoisted. However, while var is initialized with 'undefined', let and const variables remain uninitialized in the 'Temporal Dead Zone' (TDZ) from the start of the block until the line of declaration is executed. Accessing them in the TDZ throws a ReferenceError."
      },
      {
        questionNumber: 5,
        questionText: "True or False: JavaScript's garbage collector will automatically deallocate a parent variable referenced by a closure, since the parent function has finished executing.",
        questionType: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "False",
        difficultyRating: 6,
        hint: "Consider why closures are useful for keeping variables in memory.",
        detailedExplanation: "Since the nested inner function retains a lexical reference to the outer scope variables (forming a closure), the garbage collector cannot clean up those parent variables as long as the inner function is still reachable in the code. This is how closures preserve private states."
      }
    ]
  },
  "Ancient Roman Architecture": {
    quizTitle: "Ancient Roman Architecture: Engineering, Concrete, & Monumental Design",
    topic: "Ancient Roman Architecture",
    difficulty: "Advanced",
    questions: [
      {
        questionNumber: 1,
        questionText: "Which structural element, popularized and refined by Roman engineers, allowed them to build vast open interior spaces like the Pantheon?",
        questionType: "MultipleChoice",
        options: [
          "The Post-and-Beam System",
          "The Corbeled Arch",
          "The Semi-Circular Arch and Concrete Dome",
          "The Ribbed Groin Vault"
        ],
        correctAnswer: "The Semi-Circular Arch and Concrete Dome",
        difficultyRating: 5,
        hint: "This feature distributed structural weight outward and downward to heavy brick walls.",
        detailedExplanation: "Roman mastery of the semi-circular arch, vaulting, and the invention of high-durability pozzolana concrete allowed them to build the Pantheon's massive unreinforced dome. By moving weight outward and downward, they eliminated the need for heavy internal support pillars."
      },
      {
        questionNumber: 2,
        questionText: "What crucial volcanic ingredient in Roman concrete (opus caementicium) allowed it to set under water and endure for millennia?",
        questionType: "MultipleChoice",
        options: [
          "Pozzolana Ash",
          "Obsidian Silica",
          "Basaltic Granite",
          "Pumice Alum"
        ],
        correctAnswer: "Pozzolana Ash",
        difficultyRating: 6,
        hint: "This volcanic sand was sourced from the region around Mount Vesuvius.",
        detailedExplanation: "Pozzolana, a volcanic ash sourced from Pozzuoli near Naples, chemically reacts with slaked lime to create a hydraulic cement. This allowed Roman concrete to set underwater and form microscopic structures of aluminum-rich tobermolite, preventing cracks from spreading over thousands of years."
      },
      {
        questionNumber: 3,
        questionText: "True or False: The Pantheon's dome is completely solid and unreinforced, utilizing progressively lighter aggregate materials (such as pumice) as it nears the central oculus.",
        questionType: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "True",
        difficultyRating: 7,
        hint: "The builders strategically changed the density of the concrete mixtures from bottom to top.",
        detailedExplanation: "To construct the world's largest unreinforced concrete dome, Roman engineers used heavy basalt aggregate at the foundation base, grading up to lighter terracotta shards, and eventually using porous pumice at the top around the open 9-meter oculus to minimize structural weight."
      },
      {
        questionNumber: 4,
        questionText: "What was the primary function of the multi-tiered arches in structures like the Pont du Gard in Nîmes?",
        questionType: "MultipleChoice",
        options: [
          "Serving as high-status triumphal military monuments.",
          "Channelling fresh water from distant mountain springs directly into Roman settlements.",
          "Enclosing large gladiatorial battlegrounds as perimeter buttresses.",
          "Providing defensive watchtower barracks along imperial borders."
        ],
        correctAnswer: "Channelling fresh water from distant mountain springs directly into Roman settlements.",
        difficultyRating: 5,
        hint: "This structure is one of the most famous preserved Roman aqueduct bridges.",
        detailedExplanation: "The Pont du Gard is a legendary multi-tiered Roman aqueduct bridge. Its arches supported a covered water channel at the top, which relied on a subtle, calculated gravity-fed gradient to transport millions of gallons of clean mountain water daily to the city of Nîmes."
      },
      {
        questionNumber: 5,
        questionText: "True or False: The Colosseum in Rome used wood as its primary load-bearing structural support for the outer rings.",
        questionType: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "False",
        difficultyRating: 4,
        hint: "Think about the monumental stone materials required to support tens of thousands of cheering citizens.",
        detailedExplanation: "The Colosseum (Flavian Amphitheater) was a masterpiece of stone, brick, and concrete. Its massive load-bearing outer walls were constructed from travertine limestone blocks held together by iron clamps, while concrete vaults supported the radial seating tiers."
      }
    ]
  },
  "Renaissance Art & History": {
    quizTitle: "Renaissance Art & History: The Golden Age of Humanism",
    topic: "Renaissance Art & History",
    difficulty: "Intermediate",
    questions: [
      {
        questionNumber: 1,
        questionText: "Which powerful Florentine family served as the premier patrons of the arts, funding figures like Michelangelo, Galileo, and Botticelli?",
        questionType: "MultipleChoice",
        options: ["The Borgias", "The Medicis", "The Sforzas", "The Viscontis"],
        correctAnswer: "The Medicis",
        difficultyRating: 4,
        hint: "Their family crest contains six red and blue balls (palle), and they dominated Florence's banking system.",
        detailedExplanation: "The House of Medici was an exceptionally wealthy banking family and political dynasty in Florence. Their massive financial patronage funded the Renaissance, giving artists and scientists the resources to produce epoch-making masterworks."
      },
      {
        questionNumber: 2,
        questionText: "What geometric composition technique, refined by Filippo Brunelleschi and codified by Leon Battista Alberti, allowed painters to represent three-dimensional space accurately on flat canvases?",
        questionType: "MultipleChoice",
        options: [
          "Linear Perspective (Single Vanishing Point)",
          "Sfumato Atmospheric Depth",
          "Chiaroscuro Volumetric Shading",
          "Tenebrism Spotlight Contrast"
        ],
        correctAnswer: "Linear Perspective (Single Vanishing Point)",
        difficultyRating: 5,
        hint: "It uses converging orthogonal lines meeting at a single point on the horizon.",
        detailedExplanation: "Linear perspective uses mathematical principles of geometry—establishing a horizon line, a vanishing point, and orthogonal lines—to create a mathematically perfect illusion of depth, completely revolutionizing Renaissance painterly realism."
      },
      {
        questionNumber: 3,
        questionText: "True or False: Michelangelo painted the ceiling of the Sistine Chapel using oil paint on dry wood panels.",
        questionType: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "False",
        difficultyRating: 6,
        hint: "He used a method that binds pigment directly with wet plaster.",
        detailedExplanation: "Michelangelo painted the Sistine Chapel ceiling using 'buon fresco' (true fresco), an extremely demanding technique where pigments are applied directly to wet, freshly laid lime plaster. When the plaster dries, the pigments become a permanent part of the wall."
      },
      {
        questionNumber: 4,
        questionText: "Which High Renaissance master is famous for 'Sfumato'—the subtle, smoky blending of colors and tones without sharp borders, as seen on the Mona Lisa?",
        questionType: "MultipleChoice",
        options: ["Raphael", "Donatello", "Leonardo da Vinci", "Sandro Botticelli"],
        correctAnswer: "Leonardo da Vinci",
        difficultyRating: 5,
        hint: "The term translates literally from Italian to 'evaporated' or 'faded like smoke'.",
        detailedExplanation: "Leonardo da Vinci championed 'sfumato'. By painting dozens of incredibly thin, translucent glaze layers, he blended shades seamlessly to create highly realistic skin tones and soft transitions, particularly visible around the eyes and corners of the lips in his portraits."
      },
      {
        questionNumber: 5,
        questionText: "True or False: Filippo Brunelleschi designed the massive dome of the Florence Cathedral (Santa Maria del Fiore) without using temporary wooden scaffolding support.",
        questionType: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "True",
        difficultyRating: 8,
        hint: "He used a self-supporting herringbone brick-laying pattern and an inner/outer double-shell design.",
        detailedExplanation: "Brunelleschi's dome was an absolute engineering miracle. Because there was not enough timber in Tuscany to build traditional scaffolding for a dome of that scale, he invented a self-supporting double-shell structure and a herringbone brick-laying design that bound the layers together as they rose."
      }
    ]
  },
  "Cellular Biology & Genetics": {
    quizTitle: "Cellular Biology & Genetics: Macromolecules and DNA Replication",
    topic: "Cellular Biology & Genetics",
    difficulty: "Advanced",
    questions: [
      {
        questionNumber: 1,
        questionText: "Where in a eukaryotic cell does translation (the synthesis of proteins from an mRNA template) primarily occur?",
        questionType: "MultipleChoice",
        options: [
          "Inside the Nucleoplasm",
          "At the Ribosomes in the Cytoplasm or Rough ER",
          "Within the inner Mitochondrial Matrix",
          "Inside the Golgi Apparatus Lumina"
        ],
        correctAnswer: "At the Ribosomes in the Cytoplasm or Rough ER",
        difficultyRating: 5,
        hint: "While transcription occurs where the DNA is stored, translation takes place at the cellular 'protein factories'.",
        detailedExplanation: "Transcription (DNA to mRNA) occurs in the nucleus. Once the mRNA transcript is completed and processed, it is exported to the cytoplasm, where ribosomes (either floating freely or bound to the rough endoplasmic reticulum) read the codons to synthesize proteins."
      },
      {
        questionNumber: 2,
        questionText: "What revolutionary gene-editing technology was adapted from a natural immune defense mechanism found in bacteria?",
        questionType: "MultipleChoice",
        options: ["Sanger Sequencing", "CRISPR-Cas9", "Polymerase Chain Reaction (PCR)", "Western Blotting Hybridization"],
        correctAnswer: "CRISPR-Cas9",
        difficultyRating: 6,
        hint: "It uses a guide RNA to direct a molecular pair of scissors (the Cas9 nuclease) to chop precise DNA locations.",
        detailedExplanation: "CRISPR-Cas9 is adapted from a natural antiviral defense mechanism used by bacteria to keep a library of viral genetic fragments and direct target-specific nucleases (like Cas9) to cut invading viral DNA."
      },
      {
        questionNumber: 3,
        questionText: "Which cellular organelle is responsible for generating adenosine triphosphate (ATP) through oxidative phosphorylation?",
        questionType: "MultipleChoice",
        options: ["The Lysosome", "The Mitochondrion", "The Peroxisome", "The Smooth Endoplasmic Reticulum"],
        correctAnswer: "The Mitochondrion",
        difficultyRating: 4,
        hint: "Often referred to as the 'powerhouse of the cell'.",
        detailedExplanation: "Mitochondria generate the majority of cellular ATP via the electron transport chain and oxidative phosphorylation across their folded inner membranes (cristae)."
      },
      {
        questionNumber: 4,
        questionText: "True or False: Human gametes (sperm and egg cells) are diploid, meaning they contain two full matching sets of 23 chromosomes.",
        questionType: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "False",
        difficultyRating: 5,
        hint: "Think about why gametes must combine during fertilization.",
        detailedExplanation: "Gametes are haploid (n) cells containing only one set of 23 chromosomes. When fertilization occurs, the haploid sperm and haploid egg fuse to create a diploid (2n) zygote with a full complement of 46 chromosomes."
      },
      {
        questionNumber: 5,
        questionText: "What is the correct sequential order of the phases of mitosis?",
        questionType: "MultipleChoice",
        options: [
          "Anaphase, Prophase, Metaphase, Telophase",
          "Prophase, Metaphase, Anaphase, Telophase",
          "Telophase, Prophase, Anaphase, Metaphase",
          "Metaphase, Prophase, Telophase, Anaphase"
        ],
        correctAnswer: "Prophase, Metaphase, Anaphase, Telophase",
        difficultyRating: 4,
        hint: "A helpful mnemonic is PMAT.",
        detailedExplanation: "Mitosis progresses through Prophase (chromatin condenses), Metaphase (chromosomes line up along the equatorial plate), Anaphase (sister chromatids are pulled apart), and Telophase (nuclear envelopes reform)."
      }
    ]
  },
  "World War II Cryptography": {
    quizTitle: "World War II Cryptography: The Silent Battle of Intel and Ciphers",
    topic: "World War II Cryptography",
    difficulty: "Advanced",
    questions: [
      {
        questionNumber: 1,
        questionText: "What was the name of the German electro-mechanical rotor cipher machine widely decrypted by Allied codebreakers at Bletchley Park?",
        questionType: "MultipleChoice",
        options: ["Lorenz SZ42", "Enigma", "Sigaba", "Typex"],
        correctAnswer: "Enigma",
        difficultyRating: 4,
        hint: "It used three or four interchangeable rotors and a plugboard to scramble text.",
        detailedExplanation: "The Enigma machine was the primary tactical cipher device used by the German military. Decrypting its traffic, codenamed ULTRA, provided critical strategic intelligence that heavily shortened the course of World War II."
      },
      {
        questionNumber: 2,
        questionText: "Which British mathematician led the design of the electromechanical 'Bombe' machine, which dramatically accelerated the decryption of Enigma settings?",
        questionType: "MultipleChoice",
        options: ["Tommy Flowers", "Alan Turing", "Charles Babbage", "Gordon Welchman"],
        correctAnswer: "Alan Turing",
        difficultyRating: 5,
        hint: "He is widely considered the father of modern computer science and artificial intelligence.",
        detailedExplanation: "Alan Turing (with vital contributions from Gordon Welchman and Polish cryptologists who built early 'Bomba' prototypes) designed the Bombe. It tested thousands of rotor and plugboard combinations based on cribs to find Enigma keys."
      },
      {
        questionNumber: 3,
        questionText: "Which group of Native Americans served in the United States Marine Corps, transmitting critical tactical messages in their native language to baffle Japanese intelligence?",
        questionType: "MultipleChoice",
        options: ["Apache Scouts", "Navajo Code Talkers", "Cherokee Signal Corps", "Lakota Guardians"],
        correctAnswer: "Navajo Code Talkers",
        difficultyRating: 4,
        hint: "Their unwritten language used complex tones, verbs, and syntax entirely unknown in Asia or Europe.",
        detailedExplanation: "The Navajo Code Talkers transmitted critical voice communications under intense combat conditions in the Pacific. Because Navajo is an unwritten, highly complex language, Japanese cryptanalysts were never able to break the code."
      },
      {
        questionNumber: 4,
        questionText: "True or False: The Lorenz cipher, used by the German High Command for supreme-level communication, was mathematically simpler and easier to break than the standard Enigma machine.",
        questionType: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "False",
        difficultyRating: 7,
        hint: "It utilized 12 rotors instead of Enigma's 3 or 4, and required the construction of Colossus—the world's first programmable digital computer.",
        detailedExplanation: "The Lorenz cipher was far more complex than Enigma, employing a 12-rotor system. To decrypt Lorenz messages without knowing the machine's physical layout, British engineers had to build 'Colossus', the world's first programmable electronic digital computer."
      },
      {
        questionNumber: 5,
        questionText: "What was the codename given by American intelligence to the decipherment of Japan's top-secret diplomatic cipher, the 'Purple' machine?",
        questionType: "MultipleChoice",
        options: ["Magic", "Ultra", "Overlord", "Double-Cross"],
        correctAnswer: "Magic",
        difficultyRating: 6,
        hint: "While British intercepts were ULTRA, American intercepts were called...",
        detailedExplanation: "The American decryption of Japanese diplomatic and military codes was collectively codenamed 'Magic'. The decryption of the Purple machine provided crucial foresight of Japanese diplomatic maneuvering throughout the war."
      }
    ]
  },
  "Cognitive Psychology": {
    quizTitle: "Cognitive Psychology: Information Processing and Memory Models",
    topic: "Cognitive Psychology",
    difficulty: "Intermediate",
    questions: [
      {
        questionNumber: 1,
        questionText: "According to George Miller's classic 1956 paper, what is the average capacity limit of human working memory when retaining random items?",
        questionType: "MultipleChoice",
        options: ["Three, plus or minus one", "Seven, plus or minus two", "Twelve, plus or minus three", "Four, plus or minus two"],
        correctAnswer: "Seven, plus or minus two",
        difficultyRating: 4,
        hint: "This is often referred to as 'Miller's Law'.",
        detailedExplanation: "In 1956, cognitive psychologist George Miller established that the limit of human short-term working memory capacity is about 7 plus or minus 2 chunks of information. Modern research suggests it may be closer to 4, depending on the material, but Miller's 7±2 remains a historic classic."
      },
      {
        questionNumber: 2,
        questionText: "What psychological theory, formulated by Leon Festinger in 1957, describes the mental discomfort a person experiences when holding two contradictory beliefs or values?",
        questionType: "MultipleChoice",
        options: [
          "Social Identity Theory",
          "Cognitive Dissonance",
          "Confirmation Bias",
          "Attribution Error"
        ],
        correctAnswer: "Cognitive Dissonance",
        difficultyRating: 5,
        hint: "People are highly motivated to resolve this discomfort by changing one of their beliefs or justifying the behavior.",
        detailedExplanation: "Cognitive Dissonance is the psychological distress felt when a person holds conflicting cognitions simultaneously. This distress drives people to rationalize, ignore facts, or change their beliefs to restore harmony."
      },
      {
        questionNumber: 3,
        questionText: "True or False: Frederic Bartlett's famous 'War of the Ghosts' experiment showed that human memory acts like a literal video recording, storing and playing back past events with perfect precision.",
        questionType: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "False",
        difficultyRating: 5,
        hint: "Bartlett introduced the concept of 'schemas', where we reconstruct memories using general knowledge.",
        detailedExplanation: "Sir Frederic Bartlett demonstrated that memory is highly constructive, not reproductive. People use mental shortcuts called 'schemas' to fill in gaps, causing stories or events to be remembered in ways that align with their own cultural expectations."
      },
      {
        questionNumber: 4,
        questionText: "Which brain structure is critically involved in consolidating short-term memories into long-term storage, as famously demonstrated by patient H.M.?",
        questionType: "MultipleChoice",
        options: ["The Amygdala", "The Hippocampus", "The Cerebellum", "The Prefrontal Cortex"],
        correctAnswer: "The Hippocampus",
        difficultyRating: 5,
        hint: "It looks like a seahorse and lies deep within the temporal lobe.",
        detailedExplanation: "The hippocampus is essential for consolidating information from short-term memory to long-term memory. Patient H.M., who had his hippocampi bilaterally removed, could retain short-term memories but was completely unable to form new long-term declarative memories."
      },
      {
        questionNumber: 5,
        questionText: "True or False: Broadbent's Filter Model is an 'early selection' model of attention, suggesting that sensory input is filtered out before it is processed for semantic meaning.",
        questionType: "TrueFalse",
        options: ["True", "False"],
        correctAnswer: "True",
        difficultyRating: 6,
        hint: "Think about physical filtering based on acoustic characteristics rather than content meaning.",
        detailedExplanation: "Donald Broadbent's Filter Model (1958) proposed that an attentional filter blocks unattended messages early in the processing sequence, filtering inputs purely based on their raw physical characteristics (e.g. pitch, loudness) before semantic analysis can occur."
      }
    ]
  }
};
