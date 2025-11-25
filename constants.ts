import type { LocationPin, LocationFull, User } from './types';
import { LocationCategory } from './types';

export const MOCK_USER: User = {
  id: 'user-123',
  username: 'GhostHunterX',
  avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop',
  investigationScore: 1337,
  badges: ['EVP Specialist', 'History Buff'],
};

export const MOCK_GHOST_DATA: { pins: LocationPin[], details: Record<number, LocationFull> } = {
  pins: [
    { id: 1, name: 'The Winchester Mystery House', coordinates: [37.3184, -121.9513], category: LocationCategory.HAUNTED },
    { id: 2, name: 'Alcatraz Island', coordinates: [37.8270, -122.4230], category: LocationCategory.CRIME },
    { id: 3, name: 'The Villisca Axe Murder House', coordinates: [40.9329, -94.9750], category: LocationCategory.MYSTERY },
    { id: 4, name: 'Eastern State Penitentiary', coordinates: [39.9683, -75.1725], category: LocationCategory.HAUNTED },
    { id: 5, name: 'Lizzie Borden House', coordinates: [41.7006, -71.1565], category: LocationCategory.CRIME },
    { id: 6, name: "Jack the Ripper's London", coordinates: [51.5186, -0.0740], category: LocationCategory.MYSTERY },
    { id: 7, name: 'Old Town Saloon (User Submitted)', coordinates: [34.0522, -118.2437], category: LocationCategory.USER },
    { id: 8, name: 'Lord Baltimore Hotel', coordinates: [39.2885, -76.6180], category: LocationCategory.HAUNTED },
    { id: 9, name: 'Castillo de San Marcos', coordinates: [29.8976, -81.3113], category: LocationCategory.HAUNTED },
    { id: 10, name: 'St. Augustine Lighthouse', coordinates: [29.8851, -81.2882], category: LocationCategory.HAUNTED },
    { id: 11, name: 'Old Jail, St. Augustine', coordinates: [29.9079, -81.3149], category: LocationCategory.HAUNTED },
    { id: 12, name: 'Gettysburg Battlefield', coordinates: [39.8055, -77.2498], category: LocationCategory.HAUNTED },
    { id: 13, name: 'Salem Witch Trials Memorial', coordinates: [42.5201, -70.8950], category: LocationCategory.HAUNTED },
    { id: 14, name: 'The Conjuring House', coordinates: [41.9778, -71.6826], category: LocationCategory.HAUNTED },
    { id: 15, name: 'Old New-Gate Prison', coordinates: [41.9213, -72.7483], category: LocationCategory.HAUNTED },
    { id: 16, name: 'Dock Street Theatre', coordinates: [32.7770, -79.9298], category: LocationCategory.HAUNTED },
    { id: 17, name: 'The Marshall House', coordinates: [32.0784, -81.0908], category: LocationCategory.HAUNTED },
    { id: 18, name: 'Trans-Allegheny Lunatic Asylum', coordinates: [39.0435, -80.4728], category: LocationCategory.HAUNTED },
    { id: 19, name: 'Sleepy Hollow Cemetery', coordinates: [41.0950, -73.8631], category: LocationCategory.HAUNTED },
    { id: 20, name: 'The Black Dahlia Murder', coordinates: [34.0637, -118.3288], category: LocationCategory.MYSTERY },
    { id: 21, name: 'Zodiac Killer Territory', coordinates: [38.1041, -122.2566], category: LocationCategory.MYSTERY },
    { id: 22, name: 'JonBenét Ramsey House', coordinates: [40.0084, -105.2760], category: LocationCategory.MYSTERY },
    { id: 23, name: 'Isabella Stewart Gardner Museum', coordinates: [42.3380, -71.0991], category: LocationCategory.CRIME },
    { id: 24, name: 'D.B. Cooper Skyjacking', coordinates: [45.9929, -122.7012], category: LocationCategory.MYSTERY },
    { id: 25, name: 'Disappearance of Jimmy Hoffa', coordinates: [42.5484, -83.2880], category: LocationCategory.MYSTERY },
    { id: 26, name: 'Chicago Tylenol Murders', coordinates: [42.0334, -87.9167], category: LocationCategory.CRIME },
    { id: 27, name: 'Long Island Serial Killer', coordinates: [40.6490, -73.3440], category: LocationCategory.MYSTERY },
    { id: 28, name: 'Keddie Cabin Murders', coordinates: [39.9918, -120.9599], category: LocationCategory.MYSTERY },
    { id: 29, name: 'The Boy in the Box', coordinates: [39.9955, -75.1182], category: LocationCategory.MYSTERY },
    { id: 30, name: 'Texarkana Moonlight Murders', coordinates: [33.4418, -94.0660], category: LocationCategory.MYSTERY },
    { id: 39, name: 'Amelia Earhart\'s Last Known Area', coordinates: [ -0.8713, -176.6234], category: LocationCategory.MYSTERY },
    // Ohio Locations
    { id: 40, name: 'Ohio State Reformatory', coordinates: [40.7839, -82.5029], category: LocationCategory.HAUNTED },
    { id: 41, name: 'Moonville Tunnel', coordinates: [39.3103, -82.3213], category: LocationCategory.HAUNTED },
    { id: 42, name: 'Franklin Castle', coordinates: [41.4886, -81.6586], category: LocationCategory.HAUNTED },
    { id: 43, name: 'Thurber House', coordinates: [39.9678, -82.9818], category: LocationCategory.HAUNTED },
    { id: 44, name: 'USS Cod Submarine Memorial', coordinates: [41.5076, -81.6881], category: LocationCategory.HAUNTED },
    // Pennsylvania Locations
    { id: 45, name: 'Pennhurst State School', coordinates: [40.1691, -75.5684], category: LocationCategory.HAUNTED },
    { id: 46, name: 'Hotel Bethlehem', coordinates: [40.6226, -75.3800], category: LocationCategory.HAUNTED },
    { id: 47, name: 'Farnsworth House Inn', coordinates: [39.8286, -77.2300], category: LocationCategory.HAUNTED },
    { id: 48, name: 'Mütter Museum', coordinates: [39.9535, -75.1747], category: LocationCategory.HAUNTED },
    { id: 49, name: 'Jean Bonnet Tavern', coordinates: [40.0192, -78.5832], category: LocationCategory.HAUNTED },
  ],
  details: {
    1: {
      id: 1,
      name: 'The Winchester Mystery House',
      address: '525 S Winchester Blvd, San Jose, CA 95128',
      coordinates: [37.3184, -121.9513],
      category: LocationCategory.HAUNTED,
      dossier: [
        { title: 'Spirit Stories', content: 'The house is said to be haunted by the ghost of Sarah Winchester and the spirits of those killed by Winchester rifles. Visitors report doors slamming, disembodied voices, and ghostly apparitions wandering the endless maze of hallways.' },
        { title: 'Crime & Punishment', content: 'No specific crimes are associated with the house itself, but its construction was funded by the "blood money" from the Winchester Repeating Arms Company, a weapon that played a significant role in the American West.' },
        { title: 'Social History', content: 'Construction began in 1886 and continued, 24 hours a day, until Sarah Winchester\'s death in 1922. The house is an architectural marvel and a monument to one woman\'s obsession and grief, featuring stairways to nowhere and doors that open into walls.' },
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Winchester_Mystery_House_Feb_2008.jpg/600px-Winchester_Mystery_House_Feb_2008.jpg', caption: 'Front view of the sprawling, architecturally unique mansion.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Winchester_Mystery_House_stained_glass_window_2.jpg/600px-Winchester_Mystery_House_stained_glass_window_2.jpg', caption: 'A stained glass window from inside the mysterious house.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stairs_to_nowhere_at_Winchester_Mystery_House.jpg/600px-Stairs_to_nowhere_at_Winchester_Mystery_House.jpg', caption: 'A bizarre staircase leading directly into the ceiling.' },
      ],
      tags: ['19th Century', 'Gilded Age', 'Spiritualism'],
      warning: 'This is a popular tourist destination. Please respect the property and staff.'
    },
    2: { id: 2, name: 'Alcatraz Island', address: 'Alcatraz Island, San Francisco, CA 94133', coordinates: [37.8270, -122.4230], category: LocationCategory.CRIME, dossier: [ { title: 'Spirit Stories', content: 'Known as "The Rock," Alcatraz is considered one of America\'s most haunted prisons. Former inmates and guards have reported hearing screams, cell doors clanging, and the phantom sound of a banjo from Al Capone\'s old cell.' }, { title: 'Crime & Punishment', content: 'Housed some of the most notorious criminals in American history, including Al Capone, "Machine Gun" Kelly, and Robert Stroud, the "Birdman of Alcatraz." The prison was designed to be escape-proof, though the 1962 escape by Frank Morris and the Anglin brothers remains an enduring mystery.' }, { title: 'Social History', content: 'Before becoming a federal prison in 1934, Alcatraz was a military fort. It operated as a prison until 1963. The harsh conditions and psychological isolation were legendary, making it the ultimate punishment in the U.S. justice system.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Alcatraz_Island_from_a_boat.jpg/600px-Alcatraz_Island_from_a_boat.jpg', caption: 'View of the prison from the bay at sunset.' }, { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Alcatraz_Cell_Block_2.jpg/600px-Alcatraz_Cell_Block_2.jpg', caption: 'The decaying and eerie main cell block.' }, { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Alcatraz_solitary_confinement_cell.jpg/600px-Alcatraz_solitary_confinement_cell.jpg', caption: 'A solitary confinement cell in D-Block, known as "The Hole".' } ], tags: ['20th Century', 'Prohibition', 'Great Depression'] },
    3: { id: 3, name: 'The Villisca Axe Murder House', address: '508 E 2nd St, Villisca, IA 50864', coordinates: [40.9329, -94.9750], category: LocationCategory.MYSTERY, dossier: [ { title: 'Spirit Stories', content: 'Visitors and paranormal investigators report hearing the cries of children, seeing inexplicable visions, and feeling a heavy presence, believed to be the spirits of the murdered Moore family still seeking justice.' }, { title: 'Crime & Punishment', content: 'In 1912, the six members of the Moore family and two young houseguests were found bludgeoned to death in their beds. The brutal crime was never solved, leaving a dark stain on the town and creating one of America\'s greatest unsolved mysteries.' }, { title: 'Social History', content: 'The murders terrified the small, close-knit community of Villisca, Iowa. The investigation was plagued by mishandling and suspicion fell on several individuals, but no one was ever convicted, leaving the town forever changed.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Villisca-axe-murder-house.jpg/600px-Villisca-axe-murder-house.jpg', caption: 'The unassuming exterior of the house.' }, { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Villisca_Axe_Murder_House_Upstairs_Bedroom.jpg/600px-Villisca_Axe_Murder_House_Upstairs_Bedroom.jpg', caption: 'The children\'s bedroom upstairs, where the young guests were murdered.' } ], tags: ['20th Century', 'Unsolved Mystery', 'Iowa'] },
    4: { id: 4, name: 'Eastern State Penitentiary', address: '2027 Fairmount Ave, Philadelphia, PA 19130', coordinates: [39.9683, -75.1725], category: LocationCategory.HAUNTED, dossier: [ { title: 'Spirit Stories', content: 'A former prison known for its solitary confinement and now home to unsettling echoes and ghostly figures. Shadowy figures are seen darting down halls, disembodied wails come from empty cells, and a ghostly locksmith is said to haunt the grounds.' }, { title: 'Crime & Punishment', content: 'Pioneered the "Pennsylvania system" of solitary confinement, which was intended to inspire penitence but often drove inmates to madness. It housed infamous criminals like Al Capone and bank robber Willie Sutton.' }, { title: 'Social History', content: 'Opened in 1829, it was one of the most expensive and influential prisons of its time, representing a new, ambitious philosophy of prison reform. Its crumbling, Gothic architecture now stands as a haunting monument to a failed experiment.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Eastern_State_Penitentiary_Facade.jpg/600px-Eastern_State_Penitentiary_Facade.jpg', caption: 'The imposing facade of the penitentiary.' }, { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Eastern_State_Penitentiary_cell_block.jpg/600px-Eastern_State_Penitentiary_cell_block.jpg', caption: 'A decaying, sky-lit cell block hallway.' }, { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Al_Capone%27s_cell_at_Eastern_State_Penitentiary.jpg/600px-Al_Capone%27s_cell_at_Eastern_State_Penitentiary.jpg', caption: 'Al Capone\'s restored, more luxurious cell.' } ], tags: ['19th Century', 'Prison Reform', 'Gothic Architecture'] },
    5: { id: 5, name: 'Lizzie Borden House', address: '230 2nd St, Fall River, MA 02721', coordinates: [41.7006, -71.1565], category: LocationCategory.CRIME, dossier: [ { title: 'Spirit Stories', content: 'Now a bed and breakfast, guests at the site of the famous axe murders report experiencing chilling phenomena. Many claim to hear a woman weeping, see apparitions in Victorian clothing, and feel phantom touches, particularly in the rooms where the bodies were found.' }, { title: 'Crime & Punishment', content: 'In 1892, Andrew and Abby Borden were brutally murdered with a hatchet. Their daughter, Lizzie Borden, was the primary suspect in one of the most sensational trials in American history. Despite her acquittal, the question of her guilt remains a subject of intense debate.' }, { title: 'Social History', content: 'The case captivated the nation, highlighting the strict social mores and class divisions of Gilded Age New England. The famous rhyme, "Lizzie Borden took an axe...", cemented the story in American folklore.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Lizzie_Borden_House_2008.jpg/600px-Lizzie_Borden_House_2008.jpg', caption: 'The infamous house, now a museum and B&B.' }, { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lizzie_Borden_House-Sitting_Room.jpg/600px-Lizzie_Borden_House-Sitting_Room.jpg', caption: 'The sitting room where Andrew Borden was found.' } ], tags: ['19th Century', 'Unsolved Mystery', 'Gilded Age'] },
    6: { id: 6, name: "Jack the Ripper's London", address: 'Whitechapel, London, UK', coordinates: [51.5186, -0.0740], category: LocationCategory.MYSTERY, dossier: [ { title: 'Spirit Stories', content: 'The cobbled alleyways of Whitechapel are said to be haunted by the spirits of the Ripper\'s victims. People report sudden cold spots, the scent of phantom perfume, and fleeting glimpses of women in period dress who vanish into the fog.' }, { title: 'Crime & Punishment', content: 'In 1888, a series of gruesome murders attributed to "Jack the Ripper" terrified London. The killer was never identified, creating one of the most enduring criminal mysteries in the world. The case highlighted the shortcomings of Victorian-era police work.' }, { title: 'Social History', content: 'The murders exposed the brutal poverty and desperate living conditions in London\'s East End. The media frenzy surrounding the case marked a new era of sensationalist journalism.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mitre_Square_in_the_fog_-_geograph.org.uk_-_1040375.jpg/600px-Mitre_Square_in_the_fog_-_geograph.org.uk_-_1040375.jpg', caption: 'A foggy London alley, reminiscent of the era.' }, { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Whitechapel_murders_map.jpg/600px-Whitechapel_murders_map.jpg', caption: 'A map of the Whitechapel murder locations from 1888.' } ], tags: ['19th Century', 'Victorian Era', 'Serial Killer'] },
    7: { id: 7, name: 'Old Town Saloon (User Submitted)', address: 'Los Angeles, CA', coordinates: [34.0522, -118.2437], category: LocationCategory.USER, dossier: [ { title: 'Spirit Stories', content: 'Locals claim the ghost of a Gold Rush prospector named "Silas" haunts this old watering hole. He\'s known to slide glasses down the bar, whisper in patrons\' ears, and flicker the lights whenever someone tries to sit at his favorite stool.' }, { title: 'Crime & Punishment', content: 'Legend says Silas was shot in the back during a high-stakes poker game in 1851 after being accused of cheating. His murderer was never caught, and Silas has been waiting for a rematch ever since.' }, { title: 'Social History', content: 'The saloon is one of the oldest buildings in the area, a relic of the city\'s wild, early days during the California Gold Rush. It has served as a bar, a brothel, and a hideout over its long history.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Bodie_Saloon_Interior.jpg/600px-Bodie_Saloon_Interior.jpg', caption: 'The rustic bar inside a historic Old West Saloon.' } ], tags: ['Gold Rush', 'Old West', 'Local Legend'], warning: 'This is a user-submitted location. Information may not be historically verified.' },
    8: { id: 8, name: 'Lord Baltimore Hotel', address: '20 W Baltimore St, Baltimore, MD 21201', coordinates: [39.2885, -76.6180], category: LocationCategory.HAUNTED, dossier: [ { title: 'Spirit Stories', content: 'The hotel is known for the ghost of a little girl named Molly, often seen in a white dress bouncing a red ball. Staff and guests have also reported elevators moving on their own and the spirits of a couple who took their own lives during the Great Depression.' }, { title: 'Social History', content: 'Opened in 1928, the Lord Baltimore is a grand hotel that has hosted numerous celebrities and dignitaries. Its long history has seen both opulent parties and tragic events, contributing to its haunted reputation.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Lord_Baltimore_Hotel_from_SW.jpg/600px-Lord_Baltimore_Hotel_from_SW.jpg', caption: 'Exterior of the historic Lord Baltimore Hotel.' } ], tags: ['Great Depression', 'Historic Hotel', 'Maryland'] },
    9: { id: 9, name: 'Castillo de San Marcos', address: '1 S Castillo Dr, St. Augustine, FL 32084', coordinates: [29.8976, -81.3113], category: LocationCategory.HAUNTED, dossier: [ { title: 'Spirit Stories', content: 'The oldest masonry fort in the continental US is said to be haunted by the spirits of soldiers and prisoners. Orbs of light are frequently seen, and the ghost of a Spanish soldier is often spotted looking out over the water, still on duty.' }, { title: 'Social History', content: 'Built by the Spanish in the 17th century, the fort has a long and violent history, having been besieged multiple times. Its coquina walls absorbed cannonballs rather than shattering, making it a formidable defense.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Castillo_de_San_Marcos_%28St._Augustine%2C_Florida%29.jpg/600px-Castillo_de_San_Marcos_%28St._Augustine%2C_Florida%29.jpg', caption: 'The Castillo de San Marcos overlooking the Matanzas Bay.' } ], tags: ['17th Century', 'Spanish Empire', 'Military Fort'] },
    10: { id: 10, name: 'St. Augustine Lighthouse', address: '100 Red Cox Dr, St. Augustine, FL 32080', coordinates: [29.8851, -81.2882], category: LocationCategory.HAUNTED, dossier: [ { title: 'Spirit Stories', content: 'The lighthouse is famous for the ghosts of two young girls who drowned onsite during its construction. Visitors report hearing children\'s laughter, seeing a shadowy figure in the tower, and the lingering smell of cigar smoke from a former lighthouse keeper.' }, { title: 'Social History', content: 'The current lighthouse was completed in 1874 and is a historic landmark. Its light has guided ships safely to shore for generations, but its past is marked by tragedy.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/St._Augustine_Light_FL_us.jpg/600px-St._Augustine_Light_FL_us.jpg', caption: 'The iconic St. Augustine Lighthouse and its keeper\'s house.' } ], tags: ['19th Century', 'Maritime History', 'Florida'] },
    11: { id: 11, name: 'Old Jail, St. Augustine', address: '167 San Marco Ave, St. Augustine, FL 32084', coordinates: [29.9079, -81.3149], category: LocationCategory.HAUNTED, dossier: [ { title: 'Spirit Stories', content: 'This former jail is known for its oppressive atmosphere and paranormal activity. Visitors report feeling cold spots, hearing disembodied voices and moans, and seeing the apparition of a brutal sheriff. The gallows area is particularly active.' }, { title: 'Crime & Punishment', content: 'Built in 1891, the jail housed prisoners in harsh conditions for over 60 years. Eight men were hanged from the gallows on the property.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Old_St._Johns_County_Jail_2.jpg/600px-Old_St._Johns_County_Jail_2.jpg', caption: 'The historic Old Jail in St. Augustine.' } ], tags: ['19th Century', 'Prison', 'Capital Punishment'] },
    12: { id: 12, name: 'Gettysburg Battlefield', address: 'Gettysburg, PA 17325', coordinates: [39.8055, -77.2498], category: LocationCategory.HAUNTED, dossier: [ { title: 'Spirit Stories', content: 'As the site of the bloodiest battle of the Civil War, Gettysburg is considered one of the most haunted places in America. Visitors and investigators report seeing phantom soldiers, hearing the sounds of battle, and capturing EVPs of soldiers\' voices in areas like Devil\'s Den and Little Round Top.' }, { title: 'Social History', content: 'The Battle of Gettysburg in 1863 was a turning point in the Civil War, with over 50,000 casualties. The immense suffering and death have left a permanent psychic scar on the landscape.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Gettysburg_National_Military_Park_001.jpg/600px-Gettysburg_National_Military_Park_001.jpg', caption: 'Cannons on the Gettysburg Battlefield.' } ], tags: ['Civil War', 'Battlefield', 'Pennsylvania'] },
    13: { id: 13, name: 'Salem Witch Trials Memorial', address: '24 Liberty St, Salem, MA 01970', coordinates: [42.5201, -70.8950], category: LocationCategory.HAUNTED, dossier: [ { title: 'Spirit Stories', content: 'The spirits of the 19 innocent people executed during the 1692 witch trials are said to linger in Salem. The memorial, and the nearby Old Burying Point Cemetery, are hotspots for paranormal activity, with reports of orbs, ghostly apparitions, and feelings of profound sadness.' }, { title: 'Social History', content: 'The Salem witch trials were a dark period of mass hysteria and injustice in colonial America. The memorial serves as a solemn reminder of the tragic consequences of intolerance and false accusations.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Salem_Witch_Trials_Memorial_2017.jpg/600px-Salem_Witch_Trials_Memorial_2017.jpg', caption: 'Benches at the Salem Witch Trials Memorial, one for each victim.' } ], tags: ['17th Century', 'Colonial America', 'Witch Trials'] },
    14: { id: 14, name: 'The Conjuring House', address: '1677 Round Top Rd, Burrillville, RI 02802', coordinates: [41.9778, -71.6826], category: LocationCategory.HAUNTED, dossier: [ { title: 'Spirit Stories', content: 'The real farmhouse that inspired the movie "The Conjuring". The Perron family, who lived there in the 1970s, reported extreme poltergeist activity and a malevolent presence they identified as Bathsheba Sherman, a suspected witch from the 19th century.' }, { title: 'Social History', content: 'The house\'s history is filled with tragedy, including numerous deaths and suicides. The paranormal investigation conducted by Ed and Lorraine Warren became one of their most famous and terrifying cases.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/The_Conjuring_House_in_2021.jpg/600px-The_Conjuring_House_in_2021.jpg', caption: 'The infamous Arnold Estate, known as The Conjuring House.' } ], tags: ['Poltergeist', 'Ed and Lorraine Warren', 'Rhode Island'] },
    15: { id: 15, name: 'Old New-Gate Prison', address: '115 Newgate Rd, East Granby, CT 06026', coordinates: [41.9213, -72.7483], category: LocationCategory.HAUNTED, dossier: [ { title: 'Spirit Stories', content: 'This former copper mine and Revolutionary War prison is known for its intense paranormal activity. The dark, underground mining tunnels are especially active, with reports of disembodied whispers, phantom footsteps, and the feeling of being touched by unseen hands.' }, { title: 'Social History', content: 'Opened in 1773, it was the first state prison in the United States. Conditions were horrific, with prisoners forced to work in the dark, damp mines during the day and sleep there at night.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Old_New-Gate_Prison_-_East_Granby_CT_-_DSC04987.jpg/600px-Old_New-Gate_Prison_-_East_Granby_CT_-_DSC04987.jpg', caption: 'The ruins of Old New-Gate Prison.' } ], tags: ['18th Century', 'Revolutionary War', 'Prison'] },
    16: { id: 16, name: 'Dock Street Theatre', address: '135 Church St, Charleston, SC 29401', coordinates: [32.7770, -79.9298], category: LocationCategory.HAUNTED, dossier: [ { title: 'Spirit Stories', content: 'America\'s first building designed for theatrical use is said to have two resident ghosts. One is the spirit of a 19th-century actor, Junius Brutus Booth (father of John Wilkes Booth), and the other is a woman named Nettie, who was struck by lightning on the hotel balcony that once stood on the site.' }, { title: 'Social History', content: 'The original theatre opened in 1736. Though it has been rebuilt and renovated multiple times, it remains a cornerstone of Charleston\'s vibrant arts scene and storied history.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Dock_Street_Theatre.jpg/600px-Dock_Street_Theatre.jpg', caption: 'The historic Dock Street Theatre in Charleston.' } ], tags: ['18th Century', 'Theatre', 'South Carolina'] },
    17: { id: 17, name: 'The Marshall House', address: '123 E Broughton St, Savannah, GA 31401', coordinates: [32.0784, -81.0908], category: LocationCategory.HAUNTED, dossier: [ { title: 'Spirit Stories', content: 'This historic hotel served as a hospital for Union soldiers during the Civil War. Guests report seeing apparitions of soldiers, hearing children running in the halls, and faucets turning on by themselves. The hotel has embraced its haunted reputation, keeping journals of guests\' paranormal experiences.' }, { title: 'Social History', content: 'Opened in 1851, The Marshall House is one of Savannah\'s oldest hotels. It has witnessed the city\'s history, from its antebellum peak through the Civil War and beyond.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Marshall_House_Hotel_in_Savannah%2C_Georgia.jpg/600px-Marshall_House_Hotel_in_Savannah%2C_Georgia.jpg', caption: 'The iconic Marshall House hotel in Savannah.' } ], tags: ['Civil War', 'Historic Hotel', 'Georgia'] },
    18: { id: 18, name: 'Trans-Allegheny Lunatic Asylum', address: '71 Asylum Dr, Weston, WV 26452', coordinates: [39.0435, -80.4728], category: LocationCategory.HAUNTED, dossier: [ { title: 'Spirit Stories', content: 'A former psychiatric hospital with a dark history of mistreatment and experimental procedures. The immense suffering within its walls has led to intense paranormal activity. Shadow figures are common, and the ghost of a young girl named Lily is frequently encountered.' }, { title: 'Social History', content: 'Originally designed to house 250 patients, the asylum was severely overcrowded for most of its history, holding over 2,400 patients in the 1950s. It closed in 1994, and now stands as a monument to America\'s troubled history with mental health treatment.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Trans-Allegheny_Lunatic_Asylum.jpg/600px-Trans-Allegheny_Lunatic_Asylum.jpg', caption: 'The massive, Gothic Trans-Allegheny Lunatic Asylum.' } ], tags: ['19th Century', 'Asylum', 'Medical History'] },
    19: { id: 19, name: 'Sleepy Hollow Cemetery', address: '540 N Broadway, Sleepy Hollow, NY 10591', coordinates: [41.0950, -73.8631], category: LocationCategory.HAUNTED, dossier: [ { title: 'Spirit Stories', content: 'Made famous by Washington Irving\'s "The Legend of Sleepy Hollow," the cemetery is said to be haunted by the Headless Horseman himself, seen galloping through the grounds at night. The spirit of Irving is also said to watch over his final resting place.' }, { title: 'Social History', content: 'The cemetery is the burial place for numerous famous individuals, including Washington Irving, Andrew Carnegie, and William Rockefeller. Its beautiful, sprawling grounds are a popular destination, especially in the autumn.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Sleepy_Hollow_Cemetery_-_panoramio.jpg/600px-Sleepy_Hollow_Cemetery_-_panoramio.jpg', caption: 'The entrance to the historic Sleepy Hollow Cemetery.' } ], tags: ['Headless Horseman', 'Washington Irving', 'New York'] },
    20: { id: 20, name: 'The Black Dahlia Murder', address: 'Leimert Park, Los Angeles, CA', coordinates: [34.0637, -118.3288], category: LocationCategory.MYSTERY, dossier: [ { title: 'Crime & Punishment', content: 'In 1947, the mutilated body of 22-year-old Elizabeth Short was found in a vacant lot. The gruesome nature of the murder and the media frenzy that followed made it one of the most infamous unsolved cases in American history. The killer was never found.' }, { title: 'Social History', content: 'The case exposed the dark underbelly of post-war Hollywood glamour. The investigation was massive but plagued by false confessions and a lack of evidence, leaving a permanent scar on the city of Los Angeles.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Biltmore_Hotel_Black_Dahlia_Last_Seen_Alive.jpg/600px-Biltmore_Hotel_Black_Dahlia_Last_Seen_Alive.jpg', caption: 'The Biltmore Hotel, one of the last places Elizabeth Short was reportedly seen alive.' } ], tags: ['1940s', 'Unsolved Mystery', 'Hollywood'] },
    21: { id: 21, name: 'Zodiac Killer Territory', address: 'Vallejo, CA', coordinates: [38.1041, -122.2566], category: LocationCategory.MYSTERY, dossier: [ { title: 'Crime & Punishment', content: 'In the late 1960s and early 1970s, a serial killer known as the Zodiac terrorized Northern California. The killer was known for sending taunting letters and cryptograms to the press. Despite a massive investigation, the Zodiac\'s identity remains unknown.' }, { title: 'Social History', content: 'The Zodiac case created a climate of fear in the San Francisco Bay Area and became a national obsession. The killer\'s complex ciphers and direct communication with the media made the case unique and terrifying.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Zodiac-Killer-Letter-1969-07-31.svg/600px-Zodiac-Killer-Letter-1969-07-31.svg.png', caption: 'A portion of one of the Zodiac Killer\'s coded letters sent to the press.' } ], tags: ['1960s', 'Serial Killer', 'Cryptography'] },
    22: { id: 22, name: 'JonBenét Ramsey House', address: '749 15th St, Boulder, CO 80302', coordinates: [40.0084, -105.2760], category: LocationCategory.MYSTERY, dossier: [ { title: 'Crime & Punishment', content: 'In 1996, six-year-old beauty pageant winner JonBenét Ramsey was found murdered in the basement of her family\'s home. The case became a media sensation due to the family\'s wealth and the bizarre circumstances, including a lengthy ransom note. The murder remains unsolved.' }, { title: 'Social History', content: 'The case drew intense public scrutiny and suspicion towards the parents, John and Patsy Ramsey, though they were officially cleared by DNA evidence years later. The investigation was criticized for its handling of the crime scene.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/JonBenet_Ramsey_house_2019.jpg/600px-JonBenet_Ramsey_house_2019.jpg', caption: 'The former Ramsey family home in Boulder, Colorado.' } ], tags: ['1990s', 'Unsolved Mystery', 'Colorado'] },
    23: { id: 23, name: 'Isabella Stewart Gardner Museum', address: '25 Evans Way, Boston, MA 02115', coordinates: [42.3380, -71.0991], category: LocationCategory.CRIME, dossier: [ { title: 'Crime & Punishment', content: 'In 1990, two thieves disguised as police officers broke into the museum and stole 13 works of art, including masterpieces by Vermeer, Rembrandt, and Manet. Valued at over $500 million, it is the largest property theft in history. The art has never been recovered.' }, { title: 'Social History', content: 'The brazen heist remains one of the most baffling art crimes in the world. To this day, empty frames hang in the museum as placeholders for the stolen works, a constant reminder of the loss.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Isabella_Stewart_Gardner_Museum_Boston_2006.jpg/600px-Isabella_Stewart_Gardner_Museum_Boston_2006.jpg', caption: 'The courtyard of the Isabella Stewart Gardner Museum.' } ], tags: ['Art Heist', 'Unsolved Mystery', 'Boston'] },
    24: { id: 24, name: 'D.B. Cooper Skyjacking', address: 'Ariel, WA', coordinates: [45.9929, -122.7012], category: LocationCategory.MYSTERY, dossier: [ { title: 'Crime & Punishment', content: 'In 1971, a man known as D.B. Cooper hijacked a Boeing 727, extorted a $200,000 ransom, and then parachuted into the night over southwestern Washington. He was never seen again, and his identity remains unknown, making it the only unsolved skyjacking in U.S. history.' }, { title: 'Social History', content: 'The daring crime has become a modern folk legend. While some of the ransom money was found in 1980, no other definitive evidence has ever surfaced, fueling endless theories about Cooper\'s fate and identity.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/D._B._Cooper_composite_sketch.jpg/600px-D._B._Cooper_composite_sketch.jpg', caption: 'A police composite sketch of the mysterious skyjacker D.B. Cooper.' } ], tags: ['1970s', 'Skyjacking', 'Unsolved Mystery'] },
    25: { id: 25, name: 'Disappearance of Jimmy Hoffa', address: 'Bloomfield Township, MI', coordinates: [42.5484, -83.2880], category: LocationCategory.MYSTERY, dossier: [ { title: 'Crime & Punishment', content: 'In 1975, the former president of the powerful Teamsters union, Jimmy Hoffa, disappeared from the parking lot of the Machus Red Fox restaurant. He was declared legally dead in 1982. It is widely believed he was murdered by the Mafia, but his body has never been found.' }, { title: 'Social History', content: 'Hoffa was a controversial and powerful figure in American labor history with deep ties to organized crime. His disappearance remains a symbol of the mob\'s influence and ruthlessness during that era.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Former_Machus_Red_Fox_Restaurant.jpg/600px-Former_Machus_Red_Fox_Restaurant.jpg', caption: 'The former restaurant where Jimmy Hoffa was last seen.' } ], tags: ['1970s', 'Organized Crime', 'Unsolved Mystery'] },
    26: { id: 26, name: 'Chicago Tylenol Murders', address: 'Elk Grove Village, IL', coordinates: [42.0334, -87.9167], category: LocationCategory.CRIME, dossier: [ { title: 'Crime & Punishment', content: 'In 1982, seven people in the Chicago metropolitan area died after ingesting Tylenol-branded acetaminophen capsules that had been laced with potassium cyanide. The perpetrator was never caught, and the case remains unsolved.' }, { title: 'Social History', content: 'The incident led to widespread panic and reforms in the packaging of over-the-counter medications, introducing tamper-resistant seals that are now standard. It changed the pharmaceutical industry forever.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Tylenol_murders_bottle.jpg/600px-Tylenol_murders_bottle.jpg', caption: 'A bottle of Tylenol from the 1982 incident, now in a museum.' } ], tags: ['1980s', 'Product Tampering', 'Unsolved Mystery'] },
    27: { id: 27, name: 'Long Island Serial Killer', address: 'Gilgo Beach, NY', coordinates: [40.6490, -73.3440], category: LocationCategory.MYSTERY, dossier: [ { title: 'Crime & Punishment', content: 'Between 2010 and 2011, the remains of 10 people were found along Ocean Parkway near Gilgo Beach. The victims are believed to be the work of a serial killer, often referred to as the "Gilgo Beach Killer." While a suspect was arrested in 2023 for some of the murders, the full extent of the case remains under investigation.' }, { title: 'Social History', content: 'The case brought attention to the dark side of suburban Long Island and the vulnerabilities of sex workers, who made up many of the victims. The investigation spanned over a decade, involving complex digital and forensic evidence.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Gilgo_Beach_Sign.jpg/600px-Gilgo_Beach_Sign.jpg', caption: 'The sign for Gilgo Beach, where the remains were discovered.' } ], tags: ['Serial Killer', 'Forensics', 'Long Island'] },
    28: { id: 28, name: 'Keddie Cabin Murders', address: 'Keddie, CA', coordinates: [39.9918, -120.9599], category: LocationCategory.MYSTERY, dossier: [ { title: 'Crime & Punishment', content: 'In 1981, three people were found brutally murdered in Cabin 28 of the Keddie Resort. A fourth victim, a young girl, was missing and her remains were found three years later. The crime was exceptionally violent, and despite several promising suspects, the case remains unsolved.' }, { title: 'Social History', content: 'The case has been plagued by allegations of a mishandled and corrupt investigation by local law enforcement, which may have allowed the killers to escape justice. It has gained a cult following among true crime enthusiasts.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Keddie_Resort_cabins.jpg/600px-Keddie_Resort_cabins.jpg', caption: 'The cabins at the former Keddie Resort in the Sierra Nevada mountains.' } ], tags: ['1980s', 'Unsolved Mystery', 'True Crime'] },
    29: { id: 29, name: 'The Boy in the Box', address: 'Philadelphia, PA', coordinates: [39.9955, -75.1182], category: LocationCategory.MYSTERY, dossier: [ { title: 'Crime & Punishment', content: 'In 1957, the body of an unidentified young boy was found in a cardboard box in Philadelphia. For decades, he was known as "America\'s Unknown Child." The case remained a complete mystery until 2022, when investigators finally identified the boy as Joseph Augustus Zarelli.' }, { title: 'Social History', content: 'The case haunted Philadelphia for generations, with investigators relentlessly pursuing leads to give the boy his name back. The recent identification through forensic genealogy marks a major breakthrough, though the circumstances of his death are still under investigation.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Boy_in_the_Box_photo.jpg/600px-Boy_in_the_Box_photo.jpg', caption: 'The original police poster seeking information about the unidentified boy.' } ], tags: ['1950s', 'Forensic Genealogy', 'Cold Case'] },
    30: { id: 30, name: 'Texarkana Moonlight Murders', address: 'Texarkana, TX/AR', coordinates: [33.4418, -94.0660], category: LocationCategory.MYSTERY, dossier: [ { title: 'Crime & Punishment', content: 'In the spring of 1946, a hooded serial killer known as the "Phantom Killer" attacked eight people, killing five, in the border town of Texarkana. The attacks occurred at night on weekends, creating widespread panic.' }, { title: 'Social History', content: 'The town was gripped by terror, with residents arming themselves and staying home after dark. The case inspired the classic horror film "The Town That Dreaded Sundown." The Phantom Killer was never caught, and the case remains officially unsolved.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Texarkana_US_Post_Office_and_Courthouse.jpg/600px-Texarkana_US_Post_Office_and_Courthouse.jpg', caption: 'The unique post office and courthouse that sits on the Texas-Arkansas state line.' } ], tags: ['1940s', 'Serial Killer', 'Urban Legend'] },
    39: { id: 39, name: 'Amelia Earhart\'s Last Known Area', address: 'Howland Island, Pacific Ocean', coordinates: [-0.8713, -176.6234], category: LocationCategory.MYSTERY, dossier: [ { title: 'Crime & Punishment', content: 'In 1937, pioneering aviator Amelia Earhart and navigator Fred Noonan disappeared over the central Pacific Ocean near Howland Island during an attempt to circumnavigate the globe. The ensuing search was the most extensive in naval history at the time, but no trace was ever found.' }, { title: 'Social History', content: 'Earhart was a global celebrity and a symbol of female empowerment. Her disappearance has become one of the most enduring mysteries of the 20th century, spawning numerous theories ranging from crashing at sea to being captured by the Japanese.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Amelia_Earhart_standing_under_nose_of_her_Lockheed_Model_10-E_Electra%2C_small.jpg/600px-Amelia_Earhart_standing_under_nose_of_her_Lockheed_Model_10-E_Electra%2C_small.jpg', caption: 'Amelia Earhart with her Lockheed Electra 10E plane.' } ], tags: ['1930s', 'Aviation', 'Unsolved Mystery'] },
    40: {
      id: 40, name: 'Ohio State Reformatory', address: '100 Reformatory Rd, Mansfield, OH 44905', coordinates: [40.7839, -82.5029], category: LocationCategory.HAUNTED,
      dossier: [
        { title: 'Spirit Stories', content: 'This imposing Gothic prison is known for extreme paranormal activity, especially in the solitary confinement area known as "The Hole." Visitors report hearing disembodied voices, seeing shadow figures darting in the cellblocks, and feeling the presence of former inmates and a guard who was murdered during an escape attempt.' },
        { title: 'Social History', content: 'Built between 1886 and 1910, the reformatory was intended to reform young offenders but became notorious for overcrowding and brutal conditions. Its fame was cemented as the primary filming location for the movie *The Shawshank Redemption*.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Ohio_State_Reformatory_-_Front.jpg/600px-Ohio_State_Reformatory_-_Front.jpg', caption: 'The imposing Gothic facade of the Ohio State Reformatory.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Ohio_State_Reformatory_East_Cell_Block.jpg/600px-Ohio_State_Reformatory_East_Cell_Block.jpg', caption: 'The East Cell Block, the largest free-standing steel cell block in the world.' }
      ],
      tags: ['Prison', 'Gothic Architecture', 'Shawshank Redemption']
    },
    41: {
      id: 41, name: 'Moonville Tunnel', address: 'Moonville, Vinton County, OH', coordinates: [39.3103, -82.3213], category: LocationCategory.HAUNTED,
      dossier: [
        { title: 'Spirit Stories', content: 'The main spirit said to haunt this abandoned railroad tunnel is a brakeman who was killed by a train in the late 1800s. Visitors report seeing a swinging lantern in the darkness, disembodied voices, and ghostly figures. Another local legend tells of a "Lavender Lady" who also haunts the area.' },
        { title: 'Social History', content: 'The tunnel is one of the last remaining relics of the ghost town of Moonville, a former coal mining community. Its remote and eerie location has made it a popular destination for paranormal investigators and local thrill-seekers.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Moonville_Tunnel_2017.jpg/600px-Moonville_Tunnel_2017.jpg', caption: 'The notoriously haunted Moonville Tunnel entrance.' }
      ],
      tags: ['Railroad', 'Tunnel', 'Local Legend']
    },
    42: {
      id: 42, name: 'Franklin Castle', address: '4308 Franklin Blvd, Cleveland, OH 44113', coordinates: [41.4886, -81.6586], category: LocationCategory.HAUNTED,
      dossier: [
        { title: 'Spirit Stories', content: 'Considered Ohio\'s most haunted house, this Victorian mansion is known for its dark history of family tragedy. The spirits of the Hannes Tiedemann family, who suffered numerous deaths here, are said to remain. Reports include the cries of a child, a mysterious "woman in black," and apparitions in the windows.' },
        { title: 'Social History', content: 'The castle features hidden passages, a ballroom where strange events occur, and a tower with a grim past. Its history of tragedy and its Gothic architecture have fueled its reputation as a paranormal hotspot for over a century.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Franklin_Castle_in_Cleveland_in_2021.jpg/600px-Franklin_Castle_in_Cleveland_in_2021.jpg', caption: 'The imposing exterior of Franklin Castle.' }
      ],
      tags: ['Victorian', 'Family Curse', 'Cleveland']
    },
    43: {
      id: 43, name: 'Thurber House', address: '77 Jefferson Ave, Columbus, OH 43215', coordinates: [39.9678, -82.9818], category: LocationCategory.HAUNTED,
      dossier: [
        { title: 'Spirit Stories', content: 'The former home of celebrated author James Thurber, who famously documented his own paranormal encounter in his story "The Night the Ghost Got In." The resident ghost is believed to be a man who died in the house in the 19th century. Staff and visitors report hearing phantom footsteps on the stairs and the sound of books being knocked off shelves.' },
        { title: 'Social History', content: 'The house is now a literary center and museum dedicated to Thurber\'s work. It has embraced its haunted reputation, offering ghost tours and sharing stories of its resident spirit with visitors.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Thurber_House_2018.jpg/600px-Thurber_House_2018.jpg', caption: 'The historic Thurber House in Columbus, Ohio.' }
      ],
      tags: ['Literary History', 'James Thurber', 'Columbus']
    },
    44: {
      id: 44, name: 'USS Cod Submarine Memorial', address: '1201 N Marginal Rd, Cleveland, OH 44114', coordinates: [41.5076, -81.6881], category: LocationCategory.HAUNTED,
      dossier: [
        { title: 'Spirit Stories', content: 'This historic WWII submarine is believed to be haunted by the ghost of a crewman. Visitors report strange feelings, unexplained noises like banging on the hull from the inside, and a shadowy figure in the tight corridors of the engine room. Hatches are also known to open and close on their own.' },
        { title: 'Social History', content: 'The USS Cod is a GATO-class submarine that saw extensive service in the Pacific during World War II. It is now a National Historic Landmark and museum ship, perfectly preserved to its 1945 configuration.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/USS_Cod_SS-224_Cleveland_OH.jpg/600px-USS_Cod_SS-224_Cleveland_OH.jpg', caption: 'The USS Cod Submarine Memorial docked in Cleveland.' }
      ],
      tags: ['WWII', 'Submarine', 'Military Ghost']
    },
    45: {
      id: 45, name: 'Pennhurst State School', address: '1205 Commonwealth Dr, Spring City, PA 19475', coordinates: [40.1691, -75.5684], category: LocationCategory.HAUNTED,
      dossier: [
        { title: 'Spirit Stories', content: 'An institution infamous for its horrific conditions and patient abuse. The immense suffering has left a dark psychic stain, making it a hotspot for paranormal activity. Visitors report full-bodied apparitions, disembodied screams, and objects being thrown by unseen forces.' },
        { title: 'Social History', content: 'Opened in 1908, Pennhurst became a symbol of the mistreatment of the mentally and physically disabled in the 20th century. A 1968 television exposé revealed the horrific conditions, eventually leading to its closure in 1987.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Pennhurst_State_School_and_Hospital_-_Devon_Hall.jpg/600px-Pennhurst_State_School_and_Hospital_-_Devon_Hall.jpg', caption: 'The decaying Devon Hall on the Pennhurst campus.' }
      ],
      tags: ['Asylum', 'Medical History', 'Urban Exploration']
    },
    46: {
      id: 46, name: 'Hotel Bethlehem', address: '437 Main St, Bethlehem, PA 18018', coordinates: [40.6226, -75.3800], category: LocationCategory.HAUNTED,
      dossier: [
        { title: 'Spirit Stories', content: 'This historic hotel is known for its friendly resident ghosts. Reports include sightings of May Yohe, a 19th-century actress who lived at the hotel; a jovial former landlord who greets guests; and a young girl who appears in the lobby. Room 932 is said to be a particular hotspot.' },
        { title: 'Social History', content: 'The hotel stands on the site of the first house in Bethlehem, built in 1741. The current structure was built in 1922 and has a long history of hosting dignitaries, presidents, and celebrities.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Hotel_Bethlehem_PA.jpg/600px-Hotel_Bethlehem_PA.jpg', caption: 'The grand exterior of the Historic Hotel Bethlehem.' }
      ],
      tags: ['Historic Hotel', 'Bethlehem', 'Colonial']
    },
    47: {
      id: 47, name: 'Farnsworth House Inn', address: '401 Baltimore St, Gettysburg, PA 17325', coordinates: [39.8286, -77.2300], category: LocationCategory.HAUNTED,
      dossier: [
        { title: 'Spirit Stories', content: 'This inn is considered one of Gettysburg\'s most haunted locations. Its attic was used by Confederate sharpshooters, one of whom was accidentally killed by friendly fire. The spirits of soldiers are frequently seen and heard throughout the house, and the scent of cigar smoke often lingers in empty rooms.' },
        { title: 'Social History', content: 'The house sheltered Confederate soldiers during the Battle of Gettysburg and bears the scars of the conflict, with over 100 bullet holes still visible on its walls. It now operates as a period inn and restaurant.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Farnsworth_House_Inn.jpg/600px-Farnsworth_House_Inn.jpg', caption: 'The historic Farnsworth House Inn, scarred by the Battle of Gettysburg.' }
      ],
      tags: ['Civil War', 'Gettysburg', 'Inn']
    },
    48: {
      id: 48, name: 'Mütter Museum', address: '19 S 22nd St, Philadelphia, PA 19103', coordinates: [39.9535, -75.1747], category: LocationCategory.HAUNTED,
      dossier: [
        { title: 'Spirit Stories', content: 'As a museum filled with anatomical specimens and human remains, it\'s no surprise that paranormal activity is reported. Visitors feel watched, see shadowy figures moving among the displays, and hear disembodied whispers. The famous "Soap Lady" exhibit is a particular focus of strange feelings and apparitions.' },
        { title: 'Social History', content: 'The Mütter Museum is a medical museum that helps the public understand the mysteries and beauty of the human body while appreciating the history of diagnosis and treatment of disease. Its collection includes over 25,000 objects.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Mutter_Museum_2.jpg/600px-Mutter_Museum_2.jpg', caption: 'The Hyrtl Skull Collection on display at the Mütter Museum.' }
      ],
      tags: ['Medical History', 'Museum', 'Philadelphia']
    },
    49: {
      id: 49, name: 'Jean Bonnet Tavern', address: '6048 Lincoln Hwy, Bedford, PA 15522', coordinates: [40.0192, -78.5832], category: LocationCategory.HAUNTED,
      dossier: [
        { title: 'Spirit Stories', content: 'This 18th-century tavern is said to be home to several spirits. One is a friendly ghost who likes to play pranks on staff and guests, such as hiding keys or moving objects. A more somber spirit of a soldier from the Whiskey Rebellion era is also occasionally seen staring out a second-floor window.' },
        { title: 'Social History', content: 'Built in the 1760s, the Jean Bonnet Tavern was a key stop on the Forbes Road, a major colonial route. It played a role in the Whiskey Rebellion and has been in continuous operation for centuries, serving travelers and locals alike.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Jean_Bonnet_Tavern.jpg/600px-Jean_Bonnet_Tavern.jpg', caption: 'The historic Jean Bonnet Tavern in Bedford, Pennsylvania.' }
      ],
      tags: ['18th Century', 'Tavern', 'Whiskey Rebellion']
    },
  },
};

export const MOCK_ALIEN_DATA: { pins: LocationPin[], details: Record<number, LocationFull> } = {
  pins: [
    { id: 101, name: 'Roswell UFO Incident', coordinates: [33.3872, -104.5281], category: LocationCategory.ALIEN },
    { id: 102, name: 'Area 51', coordinates: [37.2431, -115.8111], category: LocationCategory.ALIEN },
    { id: 103, name: 'Loch Ness', coordinates: [57.3235, -4.4244], category: LocationCategory.CRYPTID },
    { id: 104, name: 'Point Pleasant (Mothman)', coordinates: [38.8418, -82.1396], category: LocationCategory.CRYPTID },
    { id: 105, name: 'Sedona Vortexes', coordinates: [34.8697, -111.7610], category: LocationCategory.VORTEX },
    { id: 106, name: 'Bermuda Triangle', coordinates: [25.0000, -71.0000], category: LocationCategory.VORTEX },
    { id: 107, name: 'Skinwalker Ranch', coordinates: [40.2570, -109.8890], category: LocationCategory.ALIEN },
    { id: 108, name: 'The Pine Barrens (Jersey Devil)', coordinates: [39.8860, -74.6460], category: LocationCategory.CRYPTID },
    { id: 109, name: 'Mount Shasta', coordinates: [41.4093, -122.1949], category: LocationCategory.VORTEX },
    { id: 110, 'name': 'Nazca Lines', coordinates: [-14.7394, -75.1306], category: LocationCategory.ALIEN },
    { id: 111, name: 'Chichen Itza', coordinates: [20.6843, -88.5678], category: LocationCategory.ALIEN },
    { id: 112, name: 'Bigfoot Territory (Bluff Creek)', coordinates: [41.3110, -123.7142], category: LocationCategory.CRYPTID },
    { id: 113, name: 'Rendlesham Forest Incident', coordinates: [52.0911, 1.4422], category: LocationCategory.ALIEN },
    { id: 114, name: 'Michigan Triangle', coordinates: [44.0322, -87.1643], category: LocationCategory.VORTEX },
    { id: 115, name: 'Lake Champlain (Champy)', coordinates: [44.5778, -73.3514], category: LocationCategory.CRYPTID },
  ],
  details: {
    101: {
      id: 101, name: 'Roswell UFO Incident', address: 'Roswell, NM 88201', coordinates: [33.3872, -104.5281], category: LocationCategory.ALIEN,
      dossier: [
        { title: 'The Incident', content: 'In 1947, a rancher discovered unusual debris in his field. The Roswell Army Air Field initially announced they had recovered a "flying disc," but quickly retracted the statement, claiming it was a conventional weather balloon. This contradiction fueled decades of intense speculation and conspiracy theories about a crashed alien spacecraft and its occupants.' },
        { title: 'Evidence & Theories', content: 'Witnesses claimed to have seen metallic debris with strange properties and even alien bodies being recovered by the military. Theories range from a simple weather balloon to a downed extraterrestrial vehicle or a secret military experiment. The "weather balloon" explanation is the official story, but it has been widely disputed.' },
        { title: 'Cultural Impact', content: 'Roswell has become synonymous with UFOs and alien cover-ups. The incident is a cornerstone of modern UFOlogy and has inspired countless books, films, and documentaries, turning the small New Mexico town into a major tourist destination for paranormal enthusiasts.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Roswell_New_Mexico_Sign.jpg/600px-Roswell_New_Mexico_Sign.jpg', caption: 'The famous welcome sign to Roswell, New Mexico.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Roswell_Daily_Record_1947.jpg/600px-Roswell_Daily_Record_1947.jpg', caption: 'The famous 1947 newspaper headline from the Roswell Daily Record.' }
      ],
      tags: ['1940s', 'UFOlogy', 'Cover-up']
    },
    102: {
      id: 102, name: 'Area 51', address: 'Lincoln County, NV', coordinates: [37.2431, -115.8111], category: LocationCategory.ALIEN,
      dossier: [
        { title: 'Classified Operations', content: 'Area 51 is a highly classified United States Air Force facility. Its primary purpose is publicly unknown; however, based on historical evidence, it likely supports the development and testing of experimental aircraft and weapons systems (black projects). The intense secrecy surrounding the base has made it a focal point of UFO and conspiracy theories.' },
        { title: 'Alien Technology Theories', content: 'The most popular theories claim the base is used to store, examine, and reverse-engineer crashed alien spacecraft, including material from Roswell. Whistleblowers like Bob Lazar have famously claimed to have worked on alien technology at the site, though their accounts are highly controversial and unverified.' },
        { title: 'Public Awareness', content: 'The base\'s existence was not officially acknowledged by the CIA until 2013. Its pop culture presence grew exponentially in the late 20th century, cementing its status as the epicenter of government secrecy and extraterrestrial conspiracies.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Extraterrestrial_Highway_Sign.jpg/600px-Extraterrestrial_Highway_Sign.jpg', caption: 'The iconic Extraterrestrial Highway (Nevada State Route 375) sign near Area 51.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Area_51_warning_sign.jpg/600px-Area_51_warning_sign.jpg', caption: 'A warning sign on the perimeter of Area 51, prohibiting entry and photography.' }
      ],
      tags: ['Cold War', 'Black Projects', 'Conspiracy']
    },
    103: {
      id: 103, name: 'Loch Ness', address: 'Loch Ness, Scotland', coordinates: [57.3235, -4.4244], category: LocationCategory.CRYPTID,
      dossier: [
        { title: 'Nessie Sightings', content: 'The Loch Ness Monster, affectionately known as "Nessie," is a creature in Scottish folklore said to inhabit Loch Ness. Modern interest was sparked by a 1933 sighting, and it has since become one of the most famous cryptids in the world. Descriptions generally recall a large, long-necked creature, often likened to a plesiosaur.' },
        { title: 'Evidence & Hoaxes', content: 'Evidence for Nessie\'s existence is largely anecdotal, with blurry photographs and sonar readings being the most cited proof. The most famous photo, the "Surgeon\'s Photograph" from 1934, was later revealed to be an elaborate hoax. Scientific consensus regards the creature as a myth, but dedicated enthusiasts continue the search.' },
        { title: 'Enduring Legend', content: 'The legend of the Loch Ness Monster has a significant cultural and economic impact on Scotland, driving tourism to the region. The mystery continues to fascinate people, representing the possibility of unknown creatures lurking in the depths of our world.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Loch_Ness_from_Dores.jpg/600px-Loch_Ness_from_Dores.jpg', caption: 'The vast, misty, and deep waters of Loch Ness.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Urquhart_Castle_and_Loch_Ness_2014.jpg/600px-Urquhart_Castle_and_Loch_Ness_2014.jpg', caption: 'Urquhart Castle on the shores of Loch Ness, a popular spot for monster-watching.' }
      ],
      tags: ['Cryptozoology', 'Folklore', 'Scotland']
    },
    104: {
      id: 104, name: 'Point Pleasant (Mothman)', address: 'Point Pleasant, WV 25550', coordinates: [38.8418, -82.1396], category: LocationCategory.CRYPTID,
      dossier: [
        { title: 'The Prophecies', content: 'From November 1966 to December 1967, the town of Point Pleasant was gripped by sightings of a large, winged humanoid creature with glowing red eyes, which became known as the "Mothman." The creature was often seen near the town\'s abandoned TNT area from WWII.' },
        { title: 'The Silver Bridge Collapse', content: 'The Mothman sightings culminated in the tragic collapse of the Silver Bridge on December 15, 1967, which killed 46 people. Many believe the Mothman was either a harbinger of this doom or was trying to warn the town of the impending disaster. After the collapse, sightings of the creature ceased.' },
        { title: 'Local Legend', content: 'The story was popularized by John Keel\'s 1975 book "The Mothman Prophecies." The town has embraced its local legend, hosting an annual Mothman Festival and featuring a metallic statue of the creature in its downtown area.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Silver_Memorial_Bridge.jpg/600px-Silver_Memorial_Bridge.jpg', caption: 'The Silver Memorial Bridge, which replaced the collapsed Silver Bridge, over the Ohio River.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Mothman_Statue.jpg/600px-Mothman_Statue.jpg', caption: 'The iconic Mothman statue in Point Pleasant, West Virginia.' }
      ],
      tags: ['Cryptozoology', 'Harbinger', 'West Virginia']
    },
    105: {
      id: 105, name: 'Sedona Vortexes', address: 'Sedona, AZ 86336', coordinates: [34.8697, -111.7610], category: LocationCategory.VORTEX,
      dossier: [
        { title: 'Energy Centers', content: 'Sedona is believed to be a spiritual power center due to the presence of several vortexes—swirling centers of energy that are conducive to healing, meditation, and self-exploration. The main vortexes are located at Airport Mesa, Cathedral Rock, Bell Rock, and Boynton Canyon.' },
        { title: 'Types of Energy', content: 'The vortexes are identified as either "upflow" (masculine energy, helping with spiritual ascension) or "inflow" (feminine energy, good for introspection). Cathedral Rock is considered a combination of both. Believers claim to feel a tingling sensation or a rush of energy when at these sites.' },
        { title: 'New Age Hub', content: 'The concept of the Sedona vortexes was popularized in the 1980s. The town has since become a major destination for New Age spiritualists, artists, and healers, drawn by the stunning red rock landscape and the promise of profound spiritual experiences.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Cathedral_Rock_003.jpg/600px-Cathedral_Rock_003.jpg', caption: 'The stunning red rocks of Cathedral Rock at sunset.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Sedona_AZ_USA_Bell_Rock_and_Courthouse_Butte_from_N.JPG/600px-Sedona_AZ_USA_Bell_Rock_and_Courthouse_Butte_from_N.JPG', caption: 'Bell Rock, another major Sedona vortex site.' }
      ],
      tags: ['New Age', 'Spiritualism', 'Geomancy']
    },
    106: {
      id: 106, name: 'Bermuda Triangle', address: 'North Atlantic Ocean', coordinates: [25.0000, -71.0000], category: LocationCategory.VORTEX,
      dossier: [
        { title: 'Mysterious Disappearances', content: 'The Bermuda Triangle is a loosely defined region in the western part of the North Atlantic Ocean where a number of aircraft and ships are said to have disappeared under mysterious circumstances. Popular culture has attributed these disappearances to paranormal or extraterrestrial activity.' },
        { title: 'Notable Incidents', content: 'Famous incidents include the disappearance of Flight 19, a squadron of five US Navy torpedo bombers on a training mission in 1945, and the USS Cyclops in 1918. Despite the mystery, many of these disappearances have been explained by conventional causes like severe weather, human error, or equipment failure.' },
        { title: 'Skeptical View', content: 'Many official sources and scientific researchers dismiss the idea that there is any mystery. The US Coast Guard and other agencies have stated that the number of incidents within the Triangle is no greater than in any other heavily trafficked part of the ocean.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/C-5_Galaxy_летает_над._Бермудским_треугольником.jpg/600px-C-5_Galaxy_летает_над._Бермудским_треугольником.jpg', caption: 'A military aircraft flying over the vast and empty ocean.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Bermuda_Triangle.png/600px-Bermuda_Triangle.png', caption: 'A map illustrating the general area of the Bermuda Triangle.' }
      ],
      tags: ['Maritime Mystery', 'Unexplained Phenomena', 'Atlantic Ocean']
    },
    107: {
      id: 107, name: 'Skinwalker Ranch', address: 'Uintah County, UT', coordinates: [40.2570, -109.8890], category: LocationCategory.ALIEN,
      dossier: [
        { title: 'High Strangeness', content: 'Skinwalker Ranch is a property that is the site of numerous paranormal and UFO-related activities. Reports include sightings of UFOs, bizarre creatures, poltergeist activity, and cattle mutilations. The name comes from the Navajo legend of the skin-walker, a malevolent shapeshifting witch.' },
        { title: 'Scientific Investigation', content: 'The ranch was purchased by Robert Bigelow in 1996 to be studied by the National Institute for Discovery Science (NIDSci). The scientific team documented strange events, but the phenomena were often unpredictable and difficult to record. The ranch has since been the subject of intense, ongoing investigation.' },
        { title: 'Theories', content: 'Theories about the cause of the phenomena range from extraterrestrial activity and interdimensional portals to government experiments and ancient curses. The sheer variety and intensity of reported events make it one of the most enigmatic paranormal hotspots in the world.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Uintah_County_Utah_terrain.jpg/600px-Uintah_County_Utah_terrain.jpg', caption: 'The rugged and isolated terrain of Uintah County, Utah, where the ranch is located.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Homestead_in_Uintah_County.jpg/600px-Homestead_in_Uintah_County.jpg', caption: 'An old homestead on the ranch property, a focal point for many reported paranormal events.' }
      ],
      tags: ['UFOlogy', 'Paranormal', 'Shapeshifters']
    },
    108: {
      id: 108, name: 'The Pine Barrens (Jersey Devil)', address: 'Pine Barrens, NJ', coordinates: [39.8860, -74.6460], category: LocationCategory.CRYPTID,
      dossier: [
        { title: 'The Legend', content: 'The Jersey Devil is a legendary creature said to inhabit the Pine Barrens of Southern New Jersey. The creature is often described as a winged biped with hooves, a head resembling a horse or goat, and a forked tail. It is said to emit a terrifying, high-pitched scream.' },
        { title: 'Historical Sightings', content: 'The legend dates back to the 18th century, with a local woman named Mother Leeds supposedly giving birth to the demonic child. A wave of sightings in 1909 brought the creature to national attention, causing widespread panic in the region. Sporadic sightings continue to this day.' },
        { title: 'Folklore and Reality', content: 'While skeptics have proposed explanations ranging from misidentified animals to hoaxes, the legend of the Jersey Devil remains a powerful piece of New Jersey folklore, embodying the wild and mysterious nature of the vast Pine Barrens.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Pine_barrens_river.jpg/600px-Pine_barrens_river.jpg', caption: 'The dense and eerie landscape of the New Jersey Pine Barrens.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Jersey_Devil_illustration_from_1909_newspaper.jpg/600px-Jersey_Devil_illustration_from_1909_newspaper.jpg', caption: 'A famous 1909 newspaper illustration depicting the Jersey Devil.' }
      ],
      tags: ['Cryptozoology', 'Folklore', 'New Jersey']
    },
    109: {
      id: 109, name: 'Mount Shasta', address: 'Siskiyou County, CA', coordinates: [41.4093, -122.1949], category: LocationCategory.VORTEX,
      dossier: [
        { title: 'Spiritual Significance', content: 'Mount Shasta is a potentially active volcano and a major spiritual hotspot. It is considered a sacred place by Native American tribes and is a destination for New Age spiritual seekers. The mountain is believed to be one of the Earth\'s powerful energy chakras.' },
        { title: 'Legends of Telos', content: 'A prominent legend claims that a hidden city named Telos exists beneath the mountain, inhabited by advanced beings known as Lemurians who survived the sinking of their continent. These beings are sometimes seen on the slopes, described as tall and graceful.' },
        { title: 'Unusual Phenomena', content: 'Visitors and residents report a wide range of unusual phenomena, including strange lights, UFO sightings, and bizarre cloud formations (lenticular clouds) that are often mistaken for flying saucers. The mountain\'s unique energy is said to amplify spiritual experiences.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Mount_Shasta_and_Shastina_in_winter.jpg/600px-Mount_Shasta_and_Shastina_in_winter.jpg', caption: 'The majestic, snow-capped peak of Mount Shasta.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Lenticular_cloud_over_Mount_Shasta.jpg/600px-Lenticular_cloud_over_Mount_Shasta.jpg', caption: 'A lenticular cloud formation over the mountain, often mistaken for a UFO.' }
      ],
      tags: ['New Age', 'Lemuria', 'Sacred Site']
    },
    110: {
      id: 110, name: 'Nazca Lines', address: 'Nazca Desert, Peru', coordinates: [-14.7394, -75.1306], category: LocationCategory.ALIEN,
      dossier: [
        { title: 'Ancient Geoglyphs', content: 'The Nazca Lines are a group of very large geoglyphs made in the soil of the Nazca Desert in southern Peru. They were created between 500 BC and 500 AD by people of the Nazca culture. The designs range from simple lines to complex figures of animals, birds, and humans.' },
        { title: 'The Mystery', content: 'The purpose of the lines remains a mystery. Because of their massive scale, the figures can only be truly appreciated from the air. This has led to speculation about their intended audience. Were they for gods in the sky, or something else?' },
        { title: 'Ancient Astronaut Theory', content: 'Proponents of the ancient astronaut theory, most famously Erich von Däniken, have proposed that the lines were created as landing strips or navigational aids for extraterrestrial spacecraft. While this theory is not supported by mainstream science, it has captured the public imagination.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/L%C3%ADneas_de_Nazca%2C_Nazca%2C_Per%C3%BA%2C_2015-07-29%2C_DD_102.JPG/600px-L%C3%ADneas_de_Nazca%2C_Nazca%2C_Per%C3%BA%2C_2015-07-29%2C_DD_102.JPG', caption: 'The "Hummingbird" geoglyph as seen from the air.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Nazca_Lines_-_The_Astronaut.jpg/600px-Nazca_Lines_-_The_Astronaut.jpg', caption: 'The famous "Astronaut" figure, a key piece of evidence for ancient astronaut theorists.' }
      ],
      tags: ['Ancient Mystery', 'Geoglyphs', 'Peru']
    },
    111: {
      id: 111, name: 'Chichen Itza', address: 'Yucatán, Mexico', coordinates: [20.6843, -88.5678], category: LocationCategory.ALIEN,
      dossier: [
        { title: 'Mayan Metropolis', content: 'Chichen Itza was a large pre-Columbian city built by the Maya people. The site is famous for its massive step-pyramid known as El Castillo or Temple of Kukulcan, which dominates the center of the archaeological site.' },
        { title: 'Astronomical Precision', content: 'The buildings at Chichen Itza are aligned with remarkable astronomical precision. During the spring and autumn equinoxes, the shadow of the setting sun creates the illusion of a serpent slithering down the side of El Castillo\'s main staircase—a testament to the Mayans\' advanced understanding of astronomy and mathematics.' },
        { title: 'Extraterrestrial Influence?', content: 'The Mayans\' advanced knowledge has led some ancient astronaut theorists to suggest they received help from extraterrestrial visitors. The intricate carvings, complex calendar, and astronomical alignments are cited as evidence of knowledge beyond what an ancient civilization should possess.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Chichen_Itza_3.jpg/600px-Chichen_Itza_3.jpg', caption: 'The Temple of Kukulcan (El Castillo) at Chichen Itza.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Chichen_Itza_El_Caracol.jpg/600px-Chichen_Itza_El_Caracol.jpg', caption: 'El Caracol, the ancient observatory at Chichen Itza.' }
      ],
      tags: ['Ancient Civilization', 'Maya', 'Archaeoastronomy']
    },
    112: {
      id: 112, name: 'Bigfoot Territory (Bluff Creek)', address: 'Six Rivers National Forest, CA', coordinates: [41.3110, -123.7142], category: LocationCategory.CRYPTID,
      dossier: [
        { title: 'The Patterson-Gimlin Film', content: 'Bluff Creek is the location where the most famous piece of Bigfoot evidence was captured. In 1967, Roger Patterson and Bob Gimlin filmed a large, hairy, bipedal creature walking across a sandbar. This short film has been the subject of intense debate and analysis ever since.' },
        { title: 'The Creature', content: 'The figure in the film, nicknamed "Patty," exhibits a unique fluid gait and muscular movements that proponents argue would be nearly impossible for a human in a suit to replicate. Skeptics, however, maintain that the film is an elaborate hoax.' },
        { title: 'An Enduring Icon', content: 'Regardless of its authenticity, the Patterson-Gimlin film cemented the modern image of Bigfoot in popular culture and turned the remote Bluff Creek area into a pilgrimage site for Bigfoot researchers and enthusiasts.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bluff_Creek_Photo.jpg/600px-Bluff_Creek_Photo.jpg', caption: 'The remote and rugged landscape of Bluff Creek, California.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Patterson-Gimlin_film_frame_352.jpg/600px-Patterson-Gimlin_film_frame_352.jpg', caption: 'Frame 352 from the Patterson-Gimlin film, showing the iconic creature.' }
      ],
      tags: ['Cryptozoology', 'Bigfoot', 'Patterson-Gimlin Film']
    },
    113: {
      id: 113, name: 'Rendlesham Forest Incident', address: 'Suffolk, England', coordinates: [52.0911, 1.4422], category: LocationCategory.ALIEN,
      dossier: [
        { title: 'Britain\'s Roswell', content: 'In December 1980, a series of reported sightings of unexplained lights and the landing of a craft of unknown origin occurred in Rendlesham Forest. The events took place just outside RAF Woodbridge, which was being used by the U.S. Air Force at the time.' },
        { title: 'Military Witnesses', content: 'Dozens of USAF personnel were witnesses, including high-ranking officials like Lieutenant Colonel Charles Halt. Halt recorded a famous audio tape documenting his investigation in the forest, where he described seeing strange lights and a craft "dripping molten metal."' },
        { title: 'Theories and Explanations', content: 'Official explanations have suggested the lights were from a nearby lighthouse or a meteor. However, the military witnesses have consistently maintained that what they saw was of extraterrestrial or unknown origin. The incident remains one of the most credible and well-documented UFO cases in history.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Rendlesham_Forest_Path.jpg/600px-Rendlesham_Forest_Path.jpg', caption: 'A path leading into the dense Rendlesham Forest.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Orfordness_Lighthouse_from_the_air.jpg/600px-Orfordness_Lighthouse_from_the_air.jpg', caption: 'The Orford Ness Lighthouse, which skeptics claim was the source of the mysterious lights.' }
      ],
      tags: ['UFOlogy', 'Close Encounter', 'United Kingdom']
    },
    114: {
      id: 114, name: 'Michigan Triangle', address: 'Lake Michigan', coordinates: [44.0322, -87.1643], category: LocationCategory.VORTEX,
      dossier: [
        { title: 'The Great Lakes Anomaly', content: 'Similar to the Bermuda Triangle, the Michigan Triangle is an area in Lake Michigan where a number of strange disappearances of ships and aircraft have been reported. The area stretches from Ludington to Benton Harbor, Michigan, and to Manitowoc, Wisconsin.' },
        { title: 'Famous Incidents', content: 'One of the most famous cases is the disappearance of Northwest Airlines Flight 2501 in 1950, which vanished with 58 people on board and has never been found. Another is the ship captain George R. Donner, who vanished from his locked cabin on the freighter O.M. McFarland in 1937.' },
        { title: 'Possible Explanations', content: 'Theories range from strange magnetic fields and time warps to UFO activity. Skeptics point to the lake\'s notoriously unpredictable and violent weather as a more logical explanation for the incidents.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Lake_Michigan_from_Indiana_Dunes.jpg/600px-Lake_Michigan_from_Indiana_Dunes.jpg', caption: 'The vast and sometimes treacherous waters of Lake Michigan.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/DC-4_N95401_Northwest_Airlines.jpg/600px-DC-4_N95401_Northwest_Airlines.jpg', caption: 'A Douglas DC-4, the same type of aircraft as the vanished Flight 2501.' }
      ],
      tags: ['Unexplained Phenomena', 'Great Lakes', 'Maritime Mystery']
    },
    115: {
      id: 115, name: 'Lake Champlain (Champy)', address: 'Lake Champlain, VT/NY', coordinates: [44.5778, -73.3514], category: LocationCategory.CRYPTID,
      dossier: [
        { title: 'America\'s Nessie', content: '"Champ" or "Champy" is the name given to a reputed lake monster living in Lake Champlain. Sightings date back to Native American legends and were also reported by French explorer Samuel de Champlain in the 17th century. Like Nessie, it is often described as a long-necked creature.' },
        { title: 'The Mansi Photograph', content: 'The most famous piece of evidence is the "Mansi Photograph," taken by Sandra Mansi in 1977, which appears to show a dark head and long neck emerging from the water. While debated, it has never been definitively debunked and remains a compelling piece of evidence for believers.' },
        { title: 'Official Recognition', content: 'The legend of Champ is so ingrained in the local culture that both Vermont and New York have passed resolutions protecting the creature, making it a legally protected cryptid.' }
      ],
      media: [
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Lake_Champlain_from_Burlington_Waterfront_Park.jpg/600px-Lake_Champlain_from_Burlington_Waterfront_Park.jpg', caption: 'The scenic and mysterious Lake Champlain.' },
        { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Champ_statue.JPG/600px-Champ_statue.JPG', caption: 'A statue of "Champy" in Port Henry, New York.' }
      ],
      tags: ['Cryptozoology', 'Lake Monster', 'Folklore']
    },
  },
};