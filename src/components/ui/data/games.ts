import g1 from '../../../assets/g1.jpg'
import g2 from '../../../assets/g2.jpg'
import g3 from '../../../assets/g3.jpg'
import g4 from '../../../assets/g4.jpg'
import g5 from '../../../assets/g5.jpeg'
import g30 from '../../../assets/g6.jpg'
import g6 from '../../../assets/g7.jpg'
import g7 from '../../../assets/g8.jpg'
import g8 from '../../../assets/g9.jpg'
import g9 from '../../../assets/g10.jpg'

import g10 from '../../../assets/g11.jpg'
import g11 from '../../../assets/g12.jpg'
import g12 from '../../../assets/g13.jpg'
import g13 from '../../../assets/g14.jpg'
import g14 from '../../../assets/g15.jpg'
import g15 from '../../../assets/g16.jpg'
import g16 from '../../../assets/g17.jpg'
import g17 from '../../../assets/g18.jpg'
import g18 from '../../../assets/g19.jpg'
import g19 from '../../../assets/g20.jpg'
import g20 from '../../../assets/g21.jpg'
import g21 from '../../../assets/g22.jpg'
import g22 from '../../../assets/g1.jpg'
import crazyTimeLive from '../../../assets/crazy_time_live.jpg'


export interface Game {
  id: string;
  title: string;
  provider: string;
  image: string;
  isLive?: boolean;
  badge?: string;
}

export const gameData = {
  newArrivals: [
    {
      id: '1',
      title: 'TucanBit Blackjack',
      provider: 'Live88',
      image: g1,
      isLive: true
    },
    {
      id: '2',
      title: 'TucanBit Blackjack Prime',
      provider: 'Live88',
      image: g2,
      isLive: true
    },
    {
      id: '3',
      title: 'TucanBit Highroller',
      provider: 'Live88',
      image: g3,
      isLive: true
    },
    {
      id: '4',
      title: 'Alibi',
      provider: 'Peter & Sons',
      image: g7
    },
    {
      id: '5',
      title: 'Aiko and the Wind',
      provider: 'Hacksaw Gaming',
      image: g4
    },
    {
      id: '6',
      title: 'You Can Piggy Bank On It',
      provider: 'Pragmatic Play',
      image: g5
    },
    {
      id: '7',
      title: 'The Vault Chase',
      provider: 'AvatarUX',
      image: g6
    },
    {
      id: '8',
      title: 'Clover Supreme Hold and Win',
      provider: 'Kalamba Games',
      image: g8
    }
  ],
  topGames: [
    {
      id: '9',
      title: 'What the Duck?',
      provider: 'TucanBit',
      image: g9
    },
    {
      id: '10',
      title: 'Spartan Storm',
      provider: 'Hacksaw Gaming',
      image: g10,
      badge: 'HOT'
    },
    {
      id: '11',
      title: 'Barbarossa',
      provider: 'Nolimit City',
      image: g11
    },
    {
      id: '12',
      title: 'Lightning Storm',
      provider: 'Evolution',
      image: g12
    },
    {
      id: '13',
      title: 'HIT SLOT',
      provider: 'Endorphina',
      image: g13
    },
    {
      id: '14',
      title: 'Roulette',
      provider: 'TucanBit',
      image: g14
    },
    {
      id: '15',
      title: 'Iron Clash',
      provider: 'Hacksaw Gaming',
      image: g15
    },
    {
      id: '16',
      title: 'Gates of Olympus',
      provider: 'Pragmatic Play',
      image: g16
    }
  ],
  trending: [
    {
      id: '57',
      title: 'Gates of Olympus 1000',
      provider: 'Pragmatic Play',
      image: g1,
      badge: 'TRENDING'
    },
    {
      id: '58',
      title: 'Sweet Bonanza',
      provider: 'Pragmatic Play',
      image: g2,
      badge: 'HOT'
    },
    {
      id: '59',
      title: 'Wolf Gold',
      provider: 'Pragmatic Play',
      image: g3,
      badge: 'TRENDING'
    },
    {
      id: '60',
      title: 'Book of Dead',
      provider: 'Play\'n GO',
      image: g4,
      badge: 'POPULAR'
    },
    {
      id: '61',
      title: 'Starburst',
      provider: 'NetEnt',
      image: g5,
      badge: 'TRENDING'
    },
    {
      id: '62',
      title: 'Gonzo\'s Quest',
      provider: 'NetEnt',
      image: g6,
      badge: 'HOT'
    },
    {
      id: '63',
      title: 'Crazy Time Live',
      provider: 'Evolution Gaming',
      image: crazyTimeLive,
      isLive: true,
      badge: 'TRENDING'
    },
    {
      id: '64',
      title: 'Lightning Roulette',
      provider: 'Evolution Gaming',
      image: g7,
      isLive: true,
      badge: 'HOT'
    }
  ],
tucanbitSpecials:[
     {
      id: '17',
      title: 'TucanBit Blackjack',
      provider: 'Live88',
      image: g30,
      isLive: true
    },
    {
      id: '18',
      title: 'TucanBit Blackjack Prime',
      provider: 'Live88',
      image: g17,
      isLive: true
    },
    {
      id: '19',
      title: 'TucanBit Highroller',
      provider: 'Live88',
      image: g18,
      isLive: true
    },
    {
      id: '20',
      title: 'Alibi',
      provider: 'Peter & Sons',
      image: g19
    },
    {
      id: '21',
      title: 'Aiko and the Wind',
      provider: 'Hacksaw Gaming',
      image: g20
    },
    {
      id: '22',
      title: 'You Can Piggy Bank On It',
      provider: 'Pragmatic Play',
      image: g21
    },
    {
      id: '23',
      title: 'The Vault Chase',
      provider: 'AvatarUX',
      image: g22
    },
    {
      id: '24',
      title: 'Clover Supreme Hold and Win',
      provider: 'Kalamba Games',
      image: g3
    }
  
],

spinWars:[
     {
      id: '25',
      title: 'TucanBit Blackjack',
      provider: 'Live88',
      image: g1,
      isLive: true
    },
    {
      id: '26',
      title: 'TucanBit Blackjack Prime',
      provider: 'Live88',
      image: g22,
      isLive: true
    },
    {
      id: '27',
      title: 'TucanBit Highroller',
      provider: 'Live88',
      image: g2,
      isLive: true
    },
    {
      id: '28',
      title: 'Alibi',
      provider: 'Peter & Sons',
      image: g30
    },
    {
      id: '29',
      title: 'Aiko and the Wind',
      provider: 'Hacksaw Gaming',
      image: g7
    },
    {
      id: '30',
      title: 'You Can Piggy Bank On It',
      provider: 'Pragmatic Play',
      image: g5
    },
    {
      id: '31',
      title: 'The Vault Chase',
      provider: 'AvatarUX',
      image: g17
    },
    {
      id: '32',
      title: 'Clover Supreme Hold and Win',
      provider: 'Kalamba Games',
      image: g16
    }
  
],

liveCasino: [
  {
    id: '33',
    title: 'Crazy Time Live',
    provider: 'Evolution Gaming',
    image: crazyTimeLive,
    isLive: true,
    badge: 'HOT'
  },
  {
    id: '34',
    title: 'Lightning Roulette',
    provider: 'Evolution Gaming',
    image: g12,
    isLive: true
  },
  {
    id: '35',
    title: 'Blackjack VIP',
    provider: 'Evolution Gaming',
    image: g14,
    isLive: true
  },
  {
    id: '36',
    title: 'Baccarat Live',
    provider: 'Evolution Gaming',
    image: g15,
    isLive: true
  },
  {
    id: '37',
    title: 'Monopoly Live',
    provider: 'Evolution Gaming',
    image: g16,
    isLive: true
  },
  {
    id: '38',
    title: 'Dream Catcher',
    provider: 'Evolution Gaming',
    image: g17,
    isLive: true
  },
  {
    id: '39',
    title: 'Adventures Beyond Wonderland',
    provider: 'Evolution Gaming',
    image: g18,
    isLive: true
  },
  {
    id: '40',
    title: 'Sweet Bonanza Candyland',
    provider: 'Pragmatic Play Live',
    image: g19,
    isLive: true
  }
],

liveTableGames: [
  {
    id: '41',
    title: 'Speed Blackjack',
    provider: 'Evolution Gaming',
    image: g20,
    isLive: true
  },
  {
    id: '42',
    title: 'Speed Roulette',
    provider: 'Evolution Gaming',
    image: g21,
    isLive: true
  },
  {
    id: '43',
    title: 'Infinite Blackjack',
    provider: 'Evolution Gaming',
    image: g22,
    isLive: true
  },
  {
    id: '44',
    title: 'Power Up Blackjack',
    provider: 'Evolution Gaming',
    image: g1,
    isLive: true
  },
  {
    id: '45',
    title: 'Free Bet Blackjack',
    provider: 'Evolution Gaming',
    image: g2,
    isLive: true
  },
  {
    id: '46',
    title: 'Auto Roulette',
    provider: 'Evolution Gaming',
    image: g3,
    isLive: true
  },
  {
    id: '47',
    title: 'Dragon Tiger',
    provider: 'Evolution Gaming',
    image: g4,
    isLive: true
  },
  {
    id: '48',
    title: 'Casino Hold\'em',
    provider: 'Evolution Gaming',
    image: g5,
    isLive: true
  }
],

liveGameShows: [
  {
    id: '49',
    title: 'Crazy Time',
    provider: 'Evolution Gaming',
    image: crazyTimeLive,
    isLive: true,
    badge: 'POPULAR'
  },
  {
    id: '50',
    title: 'Monopoly Live',
    provider: 'Evolution Gaming',
    image: g6,
    isLive: true
  },
  {
    id: '51',
    title: 'Dream Catcher',
    provider: 'Evolution Gaming',
    image: g7,
    isLive: true
  },
  {
    id: '52',
    title: 'Adventures Beyond Wonderland',
    provider: 'Evolution Gaming',
    image: g8,
    isLive: true
  },
  {
    id: '53',
    title: 'Sweet Bonanza Candyland',
    provider: 'Pragmatic Play Live',
    image: g9,
    isLive: true
  },
  {
    id: '54',
    title: 'Gates of Olympus',
    provider: 'Pragmatic Play Live',
    image: g10,
    isLive: true
  },
  {
    id: '55',
    title: 'Big 6 Wheel',
    provider: 'Evolution Gaming',
    image: g11,
    isLive: true
  },
  {
    id: '56',
    title: 'Lightning Dice',
    provider: 'Evolution Gaming',
    image: g12,
    isLive: true
  }
]
};