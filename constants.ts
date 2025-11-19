
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
        { type: 'image', url: 'https://images.unsplash.com/photo-1571902949-113538562123?q=80&w=600&auto=format&fit=crop', caption: 'Front view of the sprawling, architecturally unique mansion.' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1629814271459-53b53629551c?q=80&w=600&auto=format&fit=crop', caption: 'A stained glass window from inside the mysterious house.' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1571902949088-345b5a749603?q=80&w=600&auto=format&fit=crop', caption: 'A bizarre staircase leading directly into the ceiling.' },
      ],
      tags: ['19th Century', 'Gilded Age', 'Spiritualism'],
      warning: 'This is a popular tourist destination. Please respect the property and staff.'
    },
    // Add other ghost locations here...
    2: { id: 2, name: 'Alcatraz Island', address: 'Alcatraz Island, San Francisco, CA 94133', coordinates: [37.8270, -122.4230], category: LocationCategory.CRIME, dossier: [ { title: 'Spirit Stories', content: 'Known as "The Rock," Alcatraz is considered one of America\'s most haunted prisons. Former inmates and guards have reported hearing screams, cell doors clanging, and the phantom sound of a banjo from Al Capone\'s old cell.' }, { title: 'Crime & Punishment', content: 'Housed some of the most notorious criminals in American history, including Al Capone, "Machine Gun" Kelly, and Robert Stroud, the "Birdman of Alcatraz." The prison was designed to be escape-proof, though the 1962 escape by Frank Morris and the Anglin brothers remains an enduring mystery.' }, { title: 'Social History', content: 'Before becoming a federal prison in 1934, Alcatraz was a military fort. It operated as a prison until 1963. The harsh conditions and psychological isolation were legendary, making it the ultimate punishment in the U.S. justice system.' } ], media: [ { type: 'image', url: 'https://images.unsplash.com/photo-1593593414813-111029221113?q=80&w=600&auto=format&fit=crop', caption: 'View of the prison from the bay at sunset.' }, { type: 'image', url: 'https://images.unsplash.com/photo-1563423751-0566838a3a03?q=80&w=600&auto=format&fit=crop', caption: 'The decaying and eerie main cell block.' }, { type: 'image', url: 'https://images.unsplash.com/photo-1616883392323-41c1b132a216?q=80&w=600&auto=format&fit=crop', caption: 'A solitary confinement cell in D-Block, known as "The Hole".' } ], tags: ['20th Century', 'Prohibition', 'Great Depression'] },
    3: { id: 3, name: 'The Villisca Axe Murder House', address: '508 E 2nd St, Villisca, IA 50864', coordinates: [40.9329, -94.9750], category: LocationCategory.MYSTERY, dossier: [ { title: 'Spirit Stories', content: 'Visitors and paranormal investigators report hearing the cries of children, seeing inexplicable visions, and feeling a heavy presence, believed to be the spirits of the murdered Moore family still seeking justice.' }, { title: 'Crime & Punishment', content: 'In 1912, the six members of the Moore family and two young houseguests were found bludgeoned to death in their beds. The brutal crime was never solved, leaving a dark stain on the town and creating one of America\'s greatest unsolved mysteries.' }, { title: 'Social History', content: 'The murders terrified the small, close-knit community of Villisca, Iowa. The investigation was plagued by mishandling and suspicion fell on several individuals, but no one was ever convicted, leaving the town forever changed.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Villisca-axe-murder-house.jpg/600px-Villisca-axe-murder-house.jpg', caption: 'The unassuming exterior of the house.' }, { type: 'image', url: 'https://live.staticflickr.com/8301/7798341652_19477b89f8_b.jpg', caption: 'The children\'s bedroom upstairs, where the young guests were murdered.' } ], tags: ['20th Century', 'Unsolved Mystery', 'Iowa'] },
    4: { id: 4, name: 'Eastern State Penitentiary', address: '2027 Fairmount Ave, Philadelphia, PA 19130', coordinates: [39.9683, -75.1725], category: LocationCategory.HAUNTED, dossier: [ { title: 'Spirit Stories', content: 'A former prison known for its solitary confinement and now home to unsettling echoes and ghostly figures. Shadowy figures are seen darting down halls, disembodied wails come from empty cells, and a ghostly locksmith is said to haunt the grounds.' }, { title: 'Crime & Punishment', content: 'Pioneered the "Pennsylvania system" of solitary confinement, which was intended to inspire penitence but often drove inmates to madness. It housed infamous criminals like Al Capone and bank robber Willie Sutton.' }, { title: 'Social History', content: 'Opened in 1829, it was one of the most expensive and influential prisons of its time, representing a new, ambitious philosophy of prison reform. Its crumbling, Gothic architecture now stands as a haunting monument to a failed experiment.' } ], media: [ { type: 'image', url: 'https://images.unsplash.com/photo-1590320434394-39213195a639?q=80&w=600&auto=format&fit=crop', caption: 'The imposing facade of the penitentiary.' }, { type: 'image', url: 'https://images.unsplash.com/photo-1534476910948-7a87179061c1?q=80&w=600&auto=format&fit=crop', caption: 'A decaying, sky-lit cell block hallway.' }, { type: 'image', url: 'https://images.unsplash.com/photo-1541892232130-1b202cd517a2?q=80&w=600&auto=format&fit=crop', caption: 'Al Capone\'s restored, more luxurious cell.' } ], tags: ['19th Century', 'Prison Reform', 'Gothic Architecture'] },
    5: { id: 5, name: 'Lizzie Borden House', address: '230 2nd St, Fall River, MA 02721', coordinates: [41.7006, -71.1565], category: LocationCategory.CRIME, dossier: [ { title: 'Spirit Stories', content: 'Now a bed and breakfast, guests at the site of the famous axe murders report experiencing chilling phenomena. Many claim to hear a woman weeping, see apparitions in Victorian clothing, and feel phantom touches, particularly in the rooms where the bodies were found.' }, { title: 'Crime & Punishment', content: 'In 1892, Andrew and Abby Borden were brutally murdered with a hatchet. Their daughter, Lizzie Borden, was the primary suspect in one of the most sensational trials in American history. Despite her acquittal, the question of her guilt remains a subject of intense debate.' }, { title: 'Social History', content: 'The case captivated the nation, highlighting the strict social mores and class divisions of Gilded Age New England. The famous rhyme, "Lizzie Borden took an axe...", cemented the story in American folklore.' } ], media: [ { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Lizzie_Borden_House_2008.jpg/600px-Lizzie_Borden_House_2008.jpg', caption: 'The infamous house, now a museum and B&B.' }, { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Lizzie_Borden_House-Sitting_Room.jpg/600px-Lizzie_Borden_House-Sitting_Room.jpg', caption: 'The sitting room where Andrew Borden was found.' } ], tags: ['19th Century', 'Unsolved Mystery', 'Gilded Age'] },
    6: { id: 6, name: "Jack the Ripper's London", address: 'Whitechapel, London, UK', coordinates: [51.5186, -0.0740], category: LocationCategory.MYSTERY, dossier: [ { title: 'Spirit Stories', content: 'The cobbled alleyways of Whitechapel are said to be haunted by the spirits of the Ripper\'s victims. People report sudden cold spots, the scent of phantom perfume, and fleeting glimpses of women in period dress who vanish into the fog.' }, { title: 'Crime & Punishment', content: 'In 1888, a series of gruesome murders attributed to "Jack the Ripper" terrified London. The killer was never identified, creating one of the most enduring criminal mysteries in the world. The case highlighted the shortcomings of Victorian-era police work.' }, { title: 'Social History', content: 'The murders exposed the brutal poverty and desperate living conditions in London\'s East End. The media frenzy surrounding the case marked a new era of sensationalist journalism.' } ], media: [ { type: 'image', url: 'https://images.unsplash.com/photo-1533162335398-942051696220?q=80&w=600&auto=format&fit=crop', caption: 'A foggy London alley, reminiscent of the era.' }, { type: 'image', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Whitechapel_murders_map.jpg/600px-Whitechapel_murders_map.jpg', caption: 'A map of the Whitechapel murder locations from 1888.' } ], tags: ['19th Century', 'Victorian Era', 'Serial Killer'] },
    7: { id: 7, name: 'Old Town Saloon (User Submitted)', address: 'Los Angeles, CA', coordinates: [34.0522, -118.2437], category: LocationCategory.USER, dossier: [ { title: 'Spirit Stories', content: 'Locals claim the ghost of a Gold Rush prospector named "Silas" haunts this old watering hole. He\'s known to slide glasses down the bar, whisper in patrons\' ears, and flicker the lights whenever someone tries to sit at his favorite stool.' }, { title: 'Crime & Punishment', content: 'Legend says Silas was shot in the back during a high-stakes poker game in 1851 after being accused of cheating. His murderer was never caught, and Silas has been waiting for a rematch ever since.' }, { title: 'Social History', content: 'The saloon is one of the oldest buildings in the area, a relic of the city\'s wild, early days during the California Gold Rush. It has served as a bar, a brothel, and a hideout over its long history.' } ], media: [ { type: 'image', url: 'https://images.unsplash.com/photo-1598882036041-0149a4c8a41a?q=80&w=600&auto=format&fit=crop', caption: 'The rustic bar inside a historic Old West Saloon.' } ], tags: ['Gold Rush', 'Old West', 'Local Legend'], warning: 'This is a user-submitted location. Information may not be historically verified.' },
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
        { type: 'image', url: 'https://images.unsplash.com/photo-1600180231362-0943361427a7?q=80&w=600&auto=format&fit=crop', caption: 'The vast, empty desert landscape surrounding Roswell.' },
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
        { type: 'image', url: 'https://images.unsplash.com/photo-1597839219216-a797f6424363?q=80&w=600&auto=format&fit=crop', caption: 'The long, empty Extraterrestrial Highway (Nevada State Route 375) near Area 51.' },
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
        { type: 'image', url: 'https://images.unsplash.com/photo-1549692402-d92286a1a1f3?q=80&w=600&auto=format&fit=crop', caption: 'The vast, misty, and deep waters of Loch Ness.' },
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
        { type: 'image', url: 'https://images.unsplash.com/photo-1621532549222-75d8624a9a01?q=80&w=600&auto=format&fit=crop', caption: 'A bridge over the Ohio River at twilight, evoking the mystery of the Silver Bridge.' },
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
        { type: 'image', url: 'https://images.unsplash.com/photo-1598135753163-6167c1a1adfd?q=80&w=600&auto=format&fit=crop', caption: 'The stunning red rocks of Cathedral Rock at sunset.' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1616259720473-8531c356165e?q=80&w=600&auto=format&fit=crop', caption: 'Juniper trees in Sedona, often showing twisted trunks believed to be caused by vortex energy.' }
      ],
      tags: ['New Age', 'Spiritualism', 'Geomancy']
    },
  },
};
