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
      title: 'Whale.io Blackjack',
      provider: 'Live88',
      image: g1,
      isLive: true
    },
    {
      id: '2',
      title: 'Whale.io Blackjack Prime',
      provider: 'Live88',
      image: g2,
      isLive: true
    },
    {
      id: '3',
      title: 'Whale.io Highroller',
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
      provider: 'By Whale',
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
      provider: 'By Whale',
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
whaleSpecials:[
     {
      id: '17',
      title: 'Whale.io Blackjack',
      provider: 'Live88',
      image: g30,
      isLive: true
    },
    {
      id: '18',
      title: 'Whale.io Blackjack Prime',
      provider: 'Live88',
      image: g17,
      isLive: true
    },
    {
      id: '19',
      title: 'Whale.io Highroller',
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
      title: 'Whale.io Blackjack',
      provider: 'Live88',
      image: g1,
      isLive: true
    },
    {
      id: '26',
      title: 'Whale.io Blackjack Prime',
      provider: 'Live88',
      image: g22,
      isLive: true
    },
    {
      id: '27',
      title: 'Whale.io Highroller',
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
  
]
};