import { useEffect, useState } from "react"
import { useOverlay } from "@/components/overlay/overlay-provider"
import default_blue_png from "@/public/rl_overlay_testing/default_team_blue.png"
import default_orange_png from "@/public/rl_overlay_testing/default_team_orange.png"
import Image, { StaticImageData } from "next/image"

export const Ov_MessageHandler = () => {

    const { gameData } = useOverlay()
    const [currentTarget, setCurrentTarget] = useState({})

    useEffect(() => {

        setCurrentTarget(gameData.players[gameData.game.target])

    }, [gameData])

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <TargetCard
                team={1} team_icon={default_blue_png}
                player_name={currentTarget?.name ?? "Testing Name"}
                score={currentTarget?.score ?? 0}
                boost={currentTarget?.boost ?? 0}
                goals={currentTarget?.goals ?? 0}
                shots={currentTarget?.shots ?? 0}
                saves={currentTarget?.saves ?? 0}
                assists={currentTarget?.assists ?? 0}
                team={currentTarget?.team ?? 0}
            />
        </div>
    )
}

function getCurrentDate(separator = '') {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear() % 100; // Get the last two digits of the year

    return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year < 10 ? `0${year}` : `${year}`}`;
}


const TargetCard = ({
    player_name = 'TESTING',
    boost = 50,
    score = 100,
    goals = 0,
    shots = 0,
    saves = 0,
    assists = 0,
    team_icon,
    team_name = "Team Name",
    team }: {
        player_name?: string,
        boost?: number,
        score?: number,
        goals?: number,
        shots?: number,
        saves?: number,
        assists?: number,
        team_icon: StaticImageData,
        team_name?: string,
        team: number
    }) => {

    const [fontsize, setFontsize] = useState('2vmax')

    useEffect(() => {

        const fontSizeThresholds = [
            { length: 6, fontSize: '1.5vmax' },
            { length: 9, fontSize: '1vmax' },
            { length: 12, fontSize: '0.8vmax' },
        ];

        for (const threshold of fontSizeThresholds) {
            if (player_name?.length > threshold.length) {
                setFontsize(threshold.fontSize);
                break;
            }
        }
    }, [boost, player_name]);

    const date = getCurrentDate('.');
    return (
        <div className='w-[25vmax] h-[7vmax] rounded-3xl flex flex-col border-black border-2 border-solid overflow-hidden'>
            <div className='h-3/5 bg-[#2B2D42] flex items-center px-[5%] gap-[2vmax]'>
                <h1 className={`font-pp-reg text-white uppercase leading-none pt-[1%]`}
                    style={{ fontSize: fontsize }}>{player_name}</h1>
                <div className='w-full flex items-center gap-[5%] h-full relative'>
                    <div className='w-full flex items-center h-full relative'>
                        <div className='absolute w-full h-1/6 bg-[#464965] z-0 opacity-100'></div>
                        <div className={`h-1/6 ${team == 1 ? 'bg-orange-400' : 'bg-blue-400'} duration-300 relative z-10`}
                            style={{ width: `${boost}%` }}></div>
                    </div>
                    <h1 className='text-[1vmax] text-white font-pp-reg h-[1.4vmax] bg-[#2B2D42] z-10 ml-auto'>{boost}</h1>
                </div>
                {/* <img src={whiteLogo} className='w-[2.2vmax] h-[2.2vmax] ml-auto'></img> */}
            </div>
            <div className='h-2/5 bg-[#dee0ed] px-[5%] flex gap-[1.5vmax] items-center overflow-hidden'>
                <div className='w-full leading-tight flex flex-col justify-center'>
                    <h1 className='uppercase text-[0.7vmax] text-[#2B2D42] font-pp-reg block text-nowrap'>{team_name}(*){score}</h1>
                    <h2 className='font-pp text-[0.4vmax]'>INCORRECT esports</h2>
                    <h2 className='font-pp text-[0.4vmax]'>Rocket League - {date}</h2>
                </div>

                <div className='flex text-[#2B2D42] gap-[0.2vmax] uppercase text-md !leading-none w-full items-center justify-center'>
                    <div className={`w-[3vmax] text-center`}>
                        <h1 className='font-pp-reg text-xl leading-none'>{goals}</h1>
                        <h2 className='font-pp-mussels'>Goals</h2>
                    </div>
                    <div className={`w-[3vmax] text-center`}>
                        <h1 className='font-pp-reg text-xl leading-none'>{shots}</h1>
                        <h2 className='font-pp-mussels'>Shots</h2>
                    </div>
                    <div className={`w-[3vmax] text-center`}>
                        <h1 className='font-pp-reg text-xl leading-none'>{saves}</h1>
                        <h2 className='font-pp-mussels'>Saves</h2>
                    </div>
                    <div className={`w-[3vmax] text-center`}>
                        <h1 className='font-pp-reg text-xl leading-none'>{assists}</h1>
                        <h2 className='font-pp-mussels'>ASST</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}