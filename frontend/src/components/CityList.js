import React from "react";

const CityList = (props) => {
    
    const handleChange = event => {
        props.onchange(event.target.value);
    }
    return(
        <>
      <label htmlFor="villes">Choisisez une ville :</label>
        <select name="villes" onChange={handleChange}>
            <option value="here">Les evenements autour de moi</option>
            <option value="Abbeville">Abbeville</option>
            <option value="Agen">Agen</option>
            <option value="Aix-en-Provence">Aix-en-Provence</option>
            <option value="Albi">Albi</option>
            <option value="Alençon">Alençon</option>
            <option value="Ambérieu-en-Bugey">Ambérieu-en-Bugey</option>
            <option value="Amiens">Amiens</option>
            <option value="Angers">Angers</option>
            <option value="Angoulême">Angoulême</option>
            <option value="Annecy">Annecy</option>
            <option value="Antibes">Antibes</option>
            <option value="Arcueil">Arcueil</option>
            <option value="Arles">Arles</option>
            <option value="Arras">Arras</option>
            <option value="Aubagne">Aubagne</option>
            <option value="Aubervilliers">Aubervilliers</option>
            <option value="Auxerre">Auxerre</option>
            <option value="Avignon">Avignon</option>
            <option value="Bagnolet">Bagnolet</option>
            <option value="Balma">Balma</option>
            <option value="Bassens">Bassens</option>
            <option value="Beaugency">Beaugency</option>
            <option value="Beauvais">Beauvais</option>
            <option value="Bédarrides">Bédarrides</option>
            <option value="Bègles">Bègles</option>
            <option value="Belfort">Belfort</option>
            <option value="Berlin">Berlin</option>
            <option value="Besançon">Besançon</option>
            <option value="Béziers">Béziers</option>
            <option value="Blagnac">Blagnac</option>
            <option value="Blois">Blois</option>
            <option value="Bobigny">Bobigny</option>
            <option value="Bondy">Bondy</option>
            <option value="Bordeaux">Bordeaux</option>
            <option value="Boulogne-Billancourt">Boulogne-Billancourt</option>
            <option value="Bourg-en-Bresse">Bourg-en-Bresse</option>
            <option value="Bourges">Bourges</option>
            <option value="Brest">Brest</option>
            <option value="Brive-la-Gaillarde">Brive-la-Gaillarde</option>
            <option value="Caen">Caen</option>
            <option value="Cahors">Cahors</option>
            <option value="Cannes">Cannes</option>
            <option value="Carvin">Carvin</option>
            <option value="Cazèresaint-Martin-d'Hères">Cazèresaint-Martin-d'Hères</option>
            <option value="Cenon">Cenon</option>
            <option value="Cergy">Cergy</option>
            <option value="Châlons-en-Champagne">Châlons-en-Champagne</option>
            <option value="Chalon-sur-Saône">Chalon-sur-Saône</option>
            <option value="Chambéry">Chambéry</option>
            <option value="Chantepie">Chantepie</option>

        </select> 
        </>
    )
};

export default CityList;
/*


Charleville-Mézières
Chartres
Châtellerault
Châtenay-Malabry
Chaumont
Clermont-Ferrand
Colmar
Colombes
Colomiers
Compiègne
Cornebarrieu
Crest
Créteil
Dijon
Douai
Dunkerque
Élancourt
Elbeuf
Épinal
Erquy
Évreux
Fécamp
Fontainebleau
Fontenay-sous-Bois
Geneva
Genève
Gif-sur-Yvette
Grenoble
Guérande
GUYANCOURT
Guyancourt
Issy-les-Moulineaux
Ivry-sur-Seine
La Ciotat
La Côte-Saint-André
La Rochelle
La Roche-sur-Yon
Labège
Langres
Laval
Le Blanc-Mesnil
Le Haillan
Le Havre
Le Kremlin-Bicêtre
Le Mans
Les Lilas
Libourne
Lille
Limoges
Lisieux
Lorient
Lormont
Lyon
Mantes-la-Jolie
Marseille
Martigues
Massy
Melun
Menton
Mérignac
Metz
Meudon
Montaigu-Vendée
Montauban
Montfort-sur-Meu
Montigny-le-Bretonneux
Montpellier
Montreuil
Moulins
Mulhouse
Nancy
Nanterre
Nantes
Narbonne
Nevers
Nice
Nîmes
Niort
Noisiel
Noisy-le-Sec
Olivet
Orleans
Orléans
Orsay
Pantin
Paris
Passy
Pau
Périgueux
Perpignan
Pessac
Poitiers
Pontoise
Quimper
Rambouillet
Ramonville-Saint-Agne
Reims
Rennes
Riom
Rochefort
Rodez
Romainville
Romans-sur-Isère
Roubaix
Rouen
Royan
Ruoms
Saint-Brieuc
Saint-Chamond
Saint-Denis
Saint-Dizier
Saintes
Saint-Étienne
Saint-Étienne-du-Rouvray
Saint-Germain-en-Laye
Saint-Jacques-de-la-Lande
Saint-Jean-le-Blanc
Saint-Malo
Saint-Nazaire
Saint-Omer
Saint-Ouen
Saint-Paul
Saint-Pierre
Salon-de-Provence
Saumur
Sceaux
Senlis
Strasbourg
Talence
Tarbes
Thonon-les-Bains
Toulon
Toulouse
Tourcoing
Tournefeuille
Tours
Trappes
Troyes
Valence
Vannes
Vauréal
Versailles
Vieux
Villenave-d'Ornon
Villeneuve-d'Ascq
Villepinte
Villers-lès-Nancy
Villeurbanne
Vitry-sur-Seine
*/