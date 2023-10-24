// Le composant Format sert à créer un menu déroulant de sélection pour différents types de formats
export function Format({ register, errors, table, defaultValue, require }) {
    return (
        <div className="format">
            {/* Label pour le menu déroulant */}
            <label htmlFor="format"></label>
            {/* Menu déroulant de sélection */}
            <select 
                id="format" // Identifiant pour associer le label au menu déroulant
                {...register("format", {
                    required: require ? "Le choix du format est requis" : null})}
                    defaultValue={defaultValue} // Valeur par défaut pour le menu déroulant
            >
                <option value="">Format</option>
                
                {/* Options pour le cas où table === "livre" */}
                {table === "livre" && (
                    <>
                        <option value="Broche">Broché</option>
                        <option value="Relie">Relié</option>
                        <option value="Poche">Poche</option>
                        <option value="Autre">Autre</option>
                    </>
                )}

                {/* Options pour le cas où table === "musique" */}
                {table === "musique" && (
                    <>
                        <option value="CD">CD</option>
                        <option value="DVD audio">DVD audio</option>
                        <option value="Vinyles 33 tours">Vinyles 33 tours</option>
                        <option value="Viniles 45 tours">Viniles 45 tours</option>
                        <option value="cassette audio">cassette audio</option>
                        <option value="Autres">Autres</option>
                    </>
                )}

                {/* Options pour le cas où table === "jeuxVideo" */}
                {table === "jeuxVideo" && (
                    <>
                        <option value="Magnavox Odyssey (1972)">Magnavox Odyssey (1972)</option>
                        <option value="VideoSport MK2 (1974 ou 1975)">VideoSport MK2 (1974 ou 1975)</option>
                        <option value="PC-50X (1975)">PC-50X (1975)</option>
                        <option value="Odyssey 2100 (1976)">Odyssey 2100 (1976)</option>
                        <option value="Pong (1976)">Pong (1976)</option>
                        <option value="Atari 2600 (1977)">Atari 2600 (1977)</option>
                        <option value="Atari 2800 (1983) (Japon uniquement)">Atari 2800 (1983) (Japon uniquement)</option>
                        <option value="Atari 7800 (1985)">Atari 7800 (1985)</option>
                        <option value="Atari Lynx (1989) Console portable">Atari Lynx (1989) Console portable</option>
                        <option value="Atari Lynx II (1991) Console portable">Atari Lynx II (1991) Console portable</option>
                        <option value="Coleco Gemini (clone de l'Atari 2600)">Coleco Gemini (clone de l'Atari 2600)</option>
                        <option value="Magnavox Odyssey²">Magnavox Odyssey²</option>
                        <option value="Game and Watch (1980) Console portable">Game and Watch (1980) Console portable</option>
                        <option value="Intellivision (1979)">Intellivision (1979)</option>
                        <option value="Intellivision II (1983)">Intellivision II (1983)</option>
                        <option value="Intellivision III (1985)">Intellivision III (1985)</option>
                        <option value="PV-1000 (1983)">PV-1000 (1983)</option>
                        <option value="Sega SG-1000 (1983)">Sega SG-1000 (1983)</option>
                        <option value="Sega SG-1000 II (1984)">Sega SG-1000 II (1984)</option>
                        <option value="Master System (1985)">Master System (1985)</option>
                        <option value="Nintendo Entertainment System (NES) (1987)">Nintendo Entertainment System (NES) (1987)</option>
                        <option value="Famicom (1983)">Famicom (1983)</option>
                        <option value="Mega Drive / Sega Genesis (1988)">Mega Drive / Sega Genesis (1988)</option>
                        <option value="Mega Drive II (1993)">Mega Drive II (1993)</option>
                        <option value="Mega-CD/Sega CD (1991)">Mega-CD/Sega CD (1991)</option>
                        <option value="Sega 32X (1994)">Sega 32X (1994)</option>
                        <option value="Sega Pico (1994)">Sega Pico (1994)</option>
                        <option value="Sega Mega Jet (1994) Console portable">Sega Mega Jet (1994) Console portable</option>
                        <option value="Sega Saturn (1994)">Sega Saturn (1994)</option>
                        <option value="Neo-Geo (1990)">Neo-Geo (1990)</option>
                        <option value="Neo-Geo CD (1994)">Neo-Geo CD (1994)</option>
                        <option value="Neo-Geo CDZ (1994)">Neo-Geo CDZ (1994)</option>
                        <option value="Neo-Geo Pocket (1998) Console portable">Neo-Geo Pocket (1998) Console portable</option>
                        <option value="Neo-Geo Pocket Color (1999) Console portable">Neo-Geo Pocket Color (1999) Console portable</option>
                        <option value="Commodore CDTV (1991)">Commodore CDTV (1991)</option>
                        <option value="Game Gear (1990) Console portable">Game Gear (1990) Console portable</option>
                        <option value="Game Boy (1989) Console portable">Game Boy (1989) Console portable</option>
                        <option value="Super Nintendo (SNES) (1990)">Super Nintendo (SNES) (1990)</option>
                        <option value="SNES Super Famicom (1990)">SNES Super Famicom (1990)</option>
                        <option value="Sega Nomad (1995) Console portable">Sega Nomad (1995) Console portable</option>
                        <option value="Atari Jaguar (1993)">Atari Jaguar (1993)</option>
                        <option value="PlayStation (1994)">PlayStation (1994)</option>
                        <option value="PlayStation 2 (2000)">PlayStation 2 (2000)</option>
                        <option value="PlayStation 3 (2006)">PlayStation 3 (2006)</option>
                        <option value="PlayStation 4 (2013)">PlayStation 4 (2013)</option>
                        <option value="PlayStation 5 (2020)">PlayStation 5 (2020)</option>
                        <option value="PlayStation Portable (2005) Console portable">PlayStation Portable (2005) Console portable</option>
                        <option value="PlayStation Vita (2011) Console portable">PlayStation Vita (2011) Console portable</option>
                        <option value="Amiga CD32 (1993)">Amiga CD32 (1993)</option>
                        <option value="Game Boy Color (1998) Console portable">Game Boy Color (1998) Console portable</option>
                        <option value="Game Boy Advance (2001) Console portable">Game Boy Advance (2001) Console portable</option>
                        <option value="Nintendo 3DS (2011) Console portable">Nintendo 3DS (2011) Console portable</option>
                        <option value="Nintendo 64 (1996)">Nintendo 64 (1996)</option>
                        <option value="Sega Dreamcast (1998)">Sega Dreamcast (1998)</option>
                        <option value="Nintendo GameCube (2001)">Nintendo GameCube (2001)</option>
                        <option value="Xbox (2001)">Xbox (2001)</option>
                        <option value="Xbox 360 (2005)">Xbox 360 (2005)</option>
                        <option value="Xbox One (2013)">Xbox One (2013)</option>
                        <option value="Wii (2006)">Wii (2006)</option>
                        <option value="Nintendo DS 2004) Console portable">Nintendo DS (2004) Console portable</option>
                        <option value="Nintendo Switch (2017)">Nintendo Switch (2017)</option>
                    </>
                )}

                {/* Options pour le cas où table === "audiovisuel" */}
                {table === "audiovisuel" && (
                    <>
                        <option value="DVD">DVD</option>
                        <option value="Blu-ray">Blu-ray</option>
                        <option value="Blu-ray 4K Ultra HD">Blu-ray 4K Ultra HD</option>
                        <option value="Blue-ray 3D active">Blue-ray 3D active</option>
                        <option value="coffrets collectors">coffrets collectors</option>
                        <option value="VHS">VHS</option>
                        <option value="UMD">UMD</option>
                        <option value="HD DVD">HD DVD</option>
                        <option value="Autres">Autres</option>
                    </>
                )}
            </select>

            {/* Affichage d'un message d'erreur si les règles de validation ne sont pas respectées */}
            {errors.format && <p>{errors.format.message}</p>}
        </div>
    )
}