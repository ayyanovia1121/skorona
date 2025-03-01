export function getCountryFlagEmoji(Location: string): string {
  const cleanLocation = Location.trim().toLowerCase();

  const country = countryList.find((country) => {
    cleanLocation.includes(country.name.toLowerCase());
  });
  return country?.flagEmoji || "";
}

export function getFlagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    .join("");
}

export const countryList = [
  {
    name: "Argentina",
    code: "AR",
    phoneCode: "+54",
    flagEmoji: "🇦🇷",
    flags: "https://flagcdn.com/h40/ar.png",
  },
  {
    name: "Australia",
    code: "AU",
    phoneCode: "+61",
    flagEmoji: "🇦🇺",
    flags: "https://flagcdn.com/h40/au.png",
  },
  {
    name: "Brazil",
    code: "BR",
    phoneCode: "+55",
    flagEmoji: "🇧🇷",
    flags: "https://flagcdn.com/h40/br.png",
  },
  {
    name: "Canada",
    code: "CA",
    phoneCode: "+1",
    flagEmoji: "🇨🇦",
    flags: "https://flagcdn.com/h40/ca.png",
  },
  {
    name: "China",
    code: "CN",
    phoneCode: "+86",
    flagEmoji: "🇨🇳",
    flags: "https://flagcdn.com/h40/cn.png",
  },
  {
    name: "Egypt",
    code: "EG",
    phoneCode: "+20",
    flagEmoji: "🇪🇬",
    flags: "https://flagcdn.com/h40/eg.png",
  },
  {
    name: "Ghana",
    code: "GH",
    phoneCode: "+233",
    flagEmoji: "🇬🇭",
    flags: "https://flagcdn.com/h40/gh.png",
  },
  {
    name: "India",
    code: "IN",
    phoneCode: "+91",
    flagEmoji: "🇮🇳",
    flags: "https://flagcdn.com/h40/in.png",
  },
  {
    name: "Indonesia",
    code: "ID",
    phoneCode: "+62",
    flagEmoji: "🇮🇩",
    flags: "https://flagcdn.com/h40/id.png",
  },
  {
    name: "Japan",
    code: "JP",
    phoneCode: "+81",
    flagEmoji: "🇯🇵",
    flags: "https://flagcdn.com/h40/jp.png",
  },
  {
    name: "Kenya",
    code: "KE",
    phoneCode: "+254",
    flagEmoji: "🇰🇪",
    flags: "https://flagcdn.com/h40/ke.png",
  },
  {
    name: "Malaysia",
    code: "MY",
    phoneCode: "+60",
    flagEmoji: "🇲🇾",
    flags: "https://flagcdn.com/h40/my.png",
  },
  {
    name: "Mexico",
    code: "MX",
    phoneCode: "+52",
    flagEmoji: "🇲🇽",
    flags: "https://flagcdn.com/h40/mx.png",
  },
  {
    name: "Nigeria",
    code: "NG",
    phoneCode: "+234",
    flagEmoji: "🇳🇬",
    flags: "https://flagcdn.com/h40/ng.png",
  },
  {
    name: "Philippines",
    code: "PH",
    phoneCode: "+63",
    flagEmoji: "🇵🇭",
    flags: "https://flagcdn.com/h40/ph.png",
  },
  {
    name: "South Africa",
    code: "ZA",
    phoneCode: "+27",
    flagEmoji: "🇿🇦",
    flags: "https://flagcdn.com/h40/za.png",
  },
  {
    name: "South Korea",
    code: "KR",
    phoneCode: "+82",
    flagEmoji: "🇰🇷",
    flags: "https://flagcdn.com/h40/kr.png",
  },
  {
    name: "Singapore",
    code: "SG",
    phoneCode: "+65",
    flagEmoji: "🇸🇬",
    flags: "https://flagcdn.com/h40/sg.png",
  },
  {
    name: "Thailand",
    code: "TH",
    phoneCode: "+66",
    flagEmoji: "🇹🇭",
    flags: "https://flagcdn.com/h40/th.png",
  },
  {
    name: "United States",
    code: "US",
    phoneCode: "+1",
    flagEmoji: "🇺🇸",
    flags: "https://flagcdn.com/h40/us.png",
  },
  {
    name: "Vietnam",
    code: "VN",
    phoneCode: "+84",
    flagEmoji: "🇻🇳",
    flags: "https://flagcdn.com/h40/vn.png",
  },
];
