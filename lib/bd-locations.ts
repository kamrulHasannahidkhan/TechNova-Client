export type ThanaGroup = { label: string; items: string[] };

export const DHAKA_URBAN = [
  "Adabor", "Badda", "Bangshal", "Bhashantek", "Cantonment", "Chawkbazar", "Dakshinkhan",
  "Darus Salam", "Demra", "Dhanmondi", "Gendaria", "Gulshan", "Hazaribagh", "Jatrabari",
  "Kadamtali", "Kafrul", "Kalabagan", "Kamrangirchar", "Khilgaon", "Khilkhet", "Kotwali",
  "Lalbagh", "Mirpur", "Mohammadpur", "Motijheel", "Mugda", "New Market", "Pallabi",
  "Paltan", "Ramna", "Rampura", "Sabujbagh", "Shah Ali", "Shahbagh", "Sher-e-Bangla Nagar",
  "Shyampur", "Sutrapur", "Tejgaon", "Turag", "Uttara East", "Uttara West", "Uttarkhan",
  "Vatara", "Wari",
];

export const DHAKA_SUBURBAN = ["Ashulia", "Dhamrai", "Dohar", "Hemayetpur", "Keraniganj Model", "Nawabganj", "Savar"];

export const LOCATIONS: Record<string, string[]> = {
  Barishal: ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Barishal Sadar", "Gaurnadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"],
  Barguna: ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Patharghata", "Taltali"],
  Bhola: ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
  Jhalokathi: ["Jhalokathi Sadar", "Kathalia", "Nalchity", "Rajapur"],
  Patuakhali: ["Bauphal", "Dashmina", "Dumki", "Galachipa", "Kalapara", "Mirzaganj", "Patuakhali Sadar", "Rangabali"],
  Pirojpur: ["Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad", "Pirojpur Sadar", "Zianagar"],

  Bandarban: ["Alikadam", "Bandarban Sadar", "Lama", "Naikhongchhari", "Rowangchhari", "Ruma", "Thanchi"],
  Brahmanbaria: ["Akhaura", "Ashuganj", "Bancharampur", "Bijoynagar", "Brahmanbaria Sadar", "Kasba", "Nabinagar", "Nasirnagar", "Sarail"],
  Chandpur: ["Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab Dakshin", "Matlab Uttar", "Shahrasti"],
  Chattogram: ["Anwara", "Bakalia", "Banshkhali", "Bayazid", "Boalkhali", "Chandanaish", "Chandgaon", "Double Mooring", "Fatikchhari", "Halishahar", "Hathazari", "Karnaphuli", "Khulshi", "Kotwali", "Lohagara", "Mirsharai", "Pahartali", "Panchlaish", "Patenga", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda"],
  Cumilla: ["Barura", "Brahmanpara", "Burichang", "Chandina", "Chauddagram", "Cumilla Adarsha Sadar", "Cumilla Sadar Dakshin", "Daudkandi", "Debidwar", "Homna", "Laksam", "Lalmai", "Meghna", "Monohargonj", "Muradnagar", "Nangalkot", "Titas"],
  "Cox's Bazar": ["Chakaria", "Cox's Bazar Sadar", "Eidgaon", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia"],
  Feni: ["Chhagalnaiya", "Daganbhuiyan", "Feni Sadar", "Fulgazi", "Parshuram", "Sonagazi"],
  Khagrachhari: ["Dighinala", "Guimara", "Khagrachhari Sadar", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"],
  Lakshmipur: ["Kamalnagar", "Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati"],
  Noakhali: ["Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Kabirhat", "Noakhali Sadar", "Senbagh", "Sonaimuri", "Subarnachar"],
  Rangamati: ["Baghaichhari", "Barkal", "Belaichhari", "Juraichhari", "Kaptai", "Kawkhali", "Langadu", "Naniarchar", "Rajasthali", "Rangamati Sadar"],

  Faridpur: ["Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Faridpur Sadar", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"],
  Gazipur: ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur", "Tongi"],
  Gopalganj: ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"],
  Kishoreganj: ["Austagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi", "Kishoreganj Sadar", "Kuliarchar", "Mithamain", "Nikli", "Pakundia", "Tarail"],
  Madaripur: ["Dasar", "Kalkini", "Madaripur Sadar", "Rajoir", "Shibchar"],
  Manikganj: ["Daulatpur", "Ghior", "Harirampur", "Manikganj Sadar", "Saturia", "Shivalaya", "Singair"],
  Munshiganj: ["Gazaria", "Lohajang", "Munshiganj Sadar", "Sirajdikhan", "Sreenagar", "Tongibari"],
  Narayanganj: ["Araihazar", "Bandar", "Fatullah", "Narayanganj Sadar", "Rupganj", "Siddhirganj", "Sonargaon"],
  Narsingdi: ["Belabo", "Monohardi", "Narsingdi Sadar", "Palash", "Raipura", "Shibpur"],
  Rajbari: ["Baliakandi", "Goalanda", "Kalukhali", "Pangsha", "Rajbari Sadar"],
  Shariatpur: ["Bhedarganj", "Damudya", "Gosairhat", "Naria", "Shariatpur Sadar", "Zajira"],
  Tangail: ["Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"],

  Bagerhat: ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"],
  Chuadanga: ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"],
  Jashore: ["Abhaynagar", "Bagherpara", "Chaugachha", "Jashore Sadar", "Jhikargachha", "Keshabpur", "Manirampur", "Sharsha"],
  Jhenaidah: ["Harinakunda", "Jhenaidah Sadar", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"],
  Khulna: ["Batiaghata", "Dacope", "Daulatpur", "Dighalia", "Dumuria", "Khalishpur", "Khan Jahan Ali", "Khulna Sadar", "Koyra", "Paikgachha", "Phultala", "Rupsha", "Sonadanga", "Terokhada"],
  Kushtia: ["Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Kushtia Sadar", "Mirpur"],
  Magura: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
  Meherpur: ["Gangni", "Meherpur Sadar", "Mujibnagar"],
  Narail: ["Kalia", "Lohagara", "Narail Sadar", "Naragati"],
  Satkhira: ["Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Satkhira Sadar", "Shyamnagar", "Tala"],

  Jamalpur: ["Bakshiganj", "Dewanganj", "Islampur", "Jamalpur Sadar", "Madarganj", "Melandaha", "Sarishabari"],
  Mymensingh: ["Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Mymensingh Sadar", "Nandail", "Phulpur", "Tarakanda", "Trishal"],
  Netrokona: ["Atpara", "Barhatta", "Durgapur", "Kalmakanda", "Kendua", "Khaliajuri", "Madan", "Mohanganj", "Netrokona Sadar", "Purbadhala"],
  Sherpur: ["Jhenaigati", "Nakla", "Nalitabari", "Sherpur Sadar", "Sreebardi"],

  Bogura: ["Adamdighi", "Bogura Sadar", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur", "Sherpur", "Shibganj", "Sonatala"],
  Joypurhat: ["Akkelpur", "Joypurhat Sadar", "Kalai", "Khetlal", "Panchbibi"],
  Naogaon: ["Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mohadevpur", "Naogaon Sadar", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"],
  Natore: ["Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Naldanga", "Natore Sadar", "Singra"],
  Chapainawabganj: ["Bholahat", "Gomastapur", "Nachole", "Nawabganj Sadar", "Shibganj"],
  Pabna: ["Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Pabna Sadar", "Santhia", "Sujanagar"],
  Rajshahi: ["Bagha", "Bagmara", "Boalia", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Motihar", "Paba", "Puthia", "Rajpara", "Shah Makhdum", "Tanore"],
  Sirajganj: ["Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Sirajganj Sadar", "Tarash", "Ullahpara"],

  Dinajpur: ["Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Dinajpur Sadar", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur", "Phulbari"],
  Gaibandha: ["Gaibandha Sadar", "Gobindaganj", "Palashbari", "Phulchhari", "Sadullapur", "Saghata", "Sundarganj"],
  Kurigram: ["Bhurungamari", "Char Rajibpur", "Chilmari", "Kurigram Sadar", "Nageshwari", "Phulbari", "Rajarhat", "Raumari", "Ulipur"],
  Lalmonirhat: ["Aditmari", "Hatibandha", "Kaliganj", "Lalmonirhat Sadar", "Patgram"],
  Nilphamari: ["Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Nilphamari Sadar", "Saidpur"],
  Panchagarh: ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"],
  Rangpur: ["Badarganj", "Gangachhara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Rangpur Sadar", "Taraganj"],
  Thakurgaon: ["Baliadangi", "Haripur", "Pirganj", "Ranisankail", "Thakurgaon Sadar"],

  Habiganj: ["Ajmiriganj", "Bahubal", "Baniachong", "Chunarughat", "Habiganj Sadar", "Lakhai", "Madhabpur", "Nabiganj", "Shayestaganj"],
  Moulvibazar: ["Barlekha", "Juri", "Kamalganj", "Kulaura", "Moulvibazar Sadar", "Rajnagar", "Sreemangal"],
  Sunamganj: ["Bishwamvarpur", "Chhatak", "Dakshin Sunamganj", "Derai", "Dharamapasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sullah", "Sunamganj Sadar", "Tahirpur"],
  Sylhet: ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Dakshin Surma", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Osmani Nagar", "Sylhet Sadar", "Zakiganj"],
};

// Common alternate spellings -> the spelling used above
const ALIASES: Record<string, string> = {
  chittagong: "chattogram", comilla: "cumilla", barisal: "barishal", bogra: "bogura",
  jessore: "jashore", jhalakathi: "jhalokathi", jhalokati: "jhalokathi",
  coxbazar: "coxsbazar", netrakona: "netrokona", maulvibazar: "moulvibazar",
  khagrachari: "khagrachhari", narsinghdi: "narsingdi",
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

const BY_KEY: Record<string, string[]> = {};
for (const [name, list] of Object.entries(LOCATIONS)) BY_KEY[norm(name)] = list;

const keyOf = (district: string) => {
  const k = norm(district);
  return ALIASES[k] || k;
};

export function getThanaGroups(district: string): ThanaGroup[] {
  const k = keyOf(district);
  if (k === "dhaka") {
    return [
      { label: "Dhaka City (Urban)", items: DHAKA_URBAN },
      { label: "Dhaka Sub-Urban", items: DHAKA_SUBURBAN },
    ];
  }
  const items = BY_KEY[k];
  return items ? [{ label: "", items }] : [];
}

// Inside Dhaka shipping applies only to Dhaka city thanas
export function isDhakaUrban(district: string, thana: string): boolean {
  return keyOf(district) === "dhaka" && DHAKA_URBAN.includes(thana);
}

export type ShippingZone = "inside" | "suburban" | "outside";

export const SHIPPING_ZONES: Record<ShippingZone, { label: string; price: number }> = {
  inside: { label: "Inside Dhaka City", price: 70 },
  suburban: { label: "Dhaka Sub-Urban", price: 110 },
  outside: { label: "Outside Dhaka", price: 130 },
};

export function getShippingZone(district: string, thana: string): ShippingZone {
  if (keyOf(district) !== "dhaka") return "outside";
  if (DHAKA_URBAN.includes(thana)) return "inside";
  if (DHAKA_SUBURBAN.includes(thana)) return "suburban";
  return "outside";
}

export type AreaOption = { thana: string; district: string; tag: string };

export function getAllAreas(): AreaOption[] {
  const list: AreaOption[] = [];
  for (const t of DHAKA_URBAN) list.push({ thana: t, district: "Dhaka", tag: "Dhaka City" });
  for (const t of DHAKA_SUBURBAN) list.push({ thana: t, district: "Dhaka", tag: "Dhaka Sub-Urban" });
  for (const [district, thanas] of Object.entries(LOCATIONS)) {
    for (const t of thanas) list.push({ thana: t, district, tag: district });
  }
  return list;
}

export const DISTRICTS = ["Dhaka", ...Object.keys(LOCATIONS)].sort();
