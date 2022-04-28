---
sidebar_position: 1
---

# Introduction
**Modio Page: https://drg.mod.io/custom-difficulty**

Custom Difficulty is a comprehensive mod that allows you to set your own difficulty experience, made 
easily configurable in JSON format. You can create, edit, and save different difficulty presets that can be 
accessed and enabled on the fly. This makes it possible to save a preset for Hazard 5, Hazard 6x2, 
Hazard 7, and Starship Troopers then be able to switch between these presets without ever having to
reload any mods or remake your lobby!

For most properties, such as enemy movement speed or enemy count, it's even possible to edit these
values in the middle of the mission.

Custom Difficulty can also be paired with [All Deep Dives Hazard 5](https://drg.mod.io/all-deep-dives-hazard-5)
mod to have your customized difficulties be applied to all three stages of both the Regular and Elite 
Deep Dives.

Here is a broad list of configurable properties:
* Most values found in a Hazard file (Enemy Health, Move Speed, Enemy Count, Attack Damage, etc...)
* Enemy Spawn Cap (how many max enemies can be present in a mission at any given time)
* Resupply Pod Nitra Cost
* Doretta Damage Resistance
* Adding or removing enemy descriptors from the spawn pools
* Modifying or defining new enemy descriptors
* Attaching pawn stats to enemy descriptors (movement speed/weaknesses/etc.)
* Apply modifiers to enemies spawned from descriptors (size/time dilation/elite state)
* Disabling disruptive seasonal events (prospector, data deposit, etc...)

drg-custom-difficulties is a repository of difficulties to be used with this mod. It contains the vanilla difficulties, Hazard 6 and 7 by Ike, as well as some other experimental difficulties. It also contains a JSON schema with descriptions for all properties which can be used in VS Code for auto completion.

Difficulties can also be imported from the base game and enabled mods (ONLY allowed when it's the first time in the space rig after starting the game). To import Hazard 6, for example, install and enable both Custom Difficulty and Hazard 6, restart the game, then it will be available at the bottom of the difficulties menu and can be saved as a regular difficulty. Imported difficulties will have the default spawn cap, resupply cost, escort mule health, etc. so be sure to update those if necessary.

When importing difficulties, I recommend enabling ONLY Custom Difficulty (+ModHub and DRGLib) and the difficulty mod to import. Having a lot of mods makes it easy to accidentally install conflicts and/or cause mod loading issues.

Special thanks to:

The Brain for diving into the spawning mechanics and figuring out how they work as well as developing some great tools for building difficulties
Virryn for constantly breaking things and making me fix them
...and everyone else who helped test! :D