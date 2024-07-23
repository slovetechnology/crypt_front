import traderimg from "../assets/images/trader.jfif"
import bg from "../assets/images/bg.jfif"
import bitcoin from '../assets/images/bitcoin.png'
import ethereum from '../assets/images/ethereum.png'
import usdt from '../assets/images/usdt.png'
import xrp from '../assets/images/xrp.png'
import solana from '../assets/images/solana.png'
import btcqrcode from '../assets/images/btcqrcode.png'
import ethqrcode from '../assets/images/ethqrcode.png'
import usdtqrcode from '../assets/images/usdtqrcode.png'
import xrpqrcode from '../assets/images/xrpqrcode.png'
import solqrcode from '../assets/images/solqrcode.png'

export const AItraders = [
    {
        traderCode: 'jamesaipro511',
        name: 'james andras',
        detail: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim quia laborum quod ipsa nostrum perspiciatis est necessitatibus facere assumenda, natus, impedit voluptatem vero animi ullam sed sint voluptatibus dignissimos quam ab illo in voluptates excepturi ratione! Facilis, placeat facere. Similique id provident assumenda perspiciatis excepturi ea fugit impedit doloribus eius.',
        fb_link: "https://web.facebook.com/divine.cris/",
        ig_link: "https://www.instagram.com/jamesandras_?igsh=MzRlODBiNWFlZA==",
        tgram_link: "https://t.me/jamesandras",
        img: traderimg
    },
    {
        traderCode: 'masonaipro374',
        name: 'mason kiefer',
        detail: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim quia laborum quod ipsa nostrum perspiciatis est necessitatibus facere assumenda, natus, impedit voluptatem vero animi ullam sed sint voluptatibus dignissimos quam ab illo in voluptates excepturi ratione! Facilis, placeat facere. Similique id provident assumenda perspiciatis excepturi ea fugit impedit doloribus eius.',
        fb_link: "",
        ig_link: "",
        tgram_link: "",
        img: bg
    }
]


export const tradingPlans = [
    {
        title: 'test run',
        price_start: 20,
        price_limit: 99,
        bonus: 12,
    },
    {
        title: 'starter plan',
        price_start: 100,
        price_limit: 499,
        bonus: 60,
    },
    {
        title: 'business plan',
        price_start: 500,
        price_limit: 999,
        bonus: 130,
    },
    {
        title: 'premier plan',
        price_start: 1000,
        price_limit: 1499,
        bonus: 210
    },
    {
        title: 'pro plan',
        price_start: 1500,
        price_limit: 2999,
        bonus: 440,
    },
    {
        title: 'diamond plan',
        price_start: 3000,
        price_limit: 10000,
        bonus: 1500,
    },
]

export const supportedCoins = [
    {
        coin: 'bitcoin',
        img: bitcoin,
        textnw: 'Your Bitcoin deposit address for Bitcoin network, copy below:',
        address: '14y635WCNGk2LbwWGDfZgYEWHSZhiEjXm',
        network: 'bitcoin network',
        qr: btcqrcode
    },
    {
        coin: 'USDT',
        img: usdt,
        textnw: 'Your USDT deposit address for Tron network, copy below:',
        address: 'TRcyNJLKUPW4wVpxpUgmTJckN7bz4DWSvV',
        network: 'tron network',
        qr: usdtqrcode
    },
    {
        coin: 'ethereum',
        img: ethereum,
        textnw: 'Your Ethereum deposit address for ERC20 network, copy below:',
        address: '0x72dab9d1e0376858579921c7id3ffb6d9db2183',
        network: 'ERC20 network',
        qr: ethqrcode
    }
    ,
    {
        coin: 'solana',
        img: solana,
        textnw: 'Your Solana deposit address for Solana network, copy below:',
        address: 'CZXopsQvqwS8YZquCQLTh7jZ4PCfZ5FEVBTH',
        network: 'solana network',
        qr: solqrcode
    },
    {
        coin: 'XRP',
        img: xrp,
        textnw: 'Your XRP deposit address for Ripple network, copy below:',
        address: 'rNxp4h8apvRis6mJf9Sh8C6iRxfrDWN7AV',
        network: 'ripple network',
        qr: xrpqrcode
    },
]

export const questions = [
    {
        title: 'What is artificial intelligence?',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, exercitationem fugiat dolorum at officiis laboriosam labore, cum quod magni animi cumque vero ea est ratione soluta facere sapiente. Laborum, quis?'
    },
    {
        title: 'What is cryptocurrency trading?',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo consequuntur, est repellendus repudiandae culpa mollitia nemo incidunt commodi libero adipisci!'
    },
    {
        title: 'How do i start my crypto trading experience as a beginner?',
        content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo consequuntur, est repellendus repudiandae culpa mollitia nemo incidunt commodi libero adipisci!'
    },
    {
        title: 'What are the risks involved?',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, exercitationem fugiat dolorum at officiis laboriosam labore, cum quod magni animi cumque vero ea est ratione soluta facere sapiente. Laborum, quis?'
    },
]
