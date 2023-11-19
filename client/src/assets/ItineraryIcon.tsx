interface Props {
    width: string
    height: string
    fill: string
}

const ItineraryIcon = (props : Props) => {

    const { width, height, fill } = props


    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={width} 
            height={height} viewBox="0 0 24 25" fill="none">
            <path 
                d="M5.46942 9.6887C7.40242 9.6887 8.96942 8.12017 8.96942 6.18529C8.96942 4.25041 7.40242 2.68188 5.46942 2.68188C3.53642 2.68188 1.96942 4.25041 1.96942 6.18529C1.96942 8.12017 3.53642 9.6887 5.46942 9.6887Z" 
                stroke={fill} 
                stroke-width="1.5" />
            <path 
                d="M16.9694 15.6946H19.9694C21.0694 15.6946 21.9694 16.5955 21.9694 17.6965V20.6994C21.9694 21.8005 21.0694 22.7014 19.9694 22.7014H16.9694C15.8694 22.7014 14.9694 21.8005 14.9694 20.6994V17.6965C14.9694 16.5955 15.8694 15.6946 16.9694 15.6946Z" 
                stroke={fill} 
                stroke-width="1.5" />
            <path 
                d="M11.9995 5.68481H14.6795C16.5295 5.68481 17.3895 7.97704 15.9995 9.19823L8.00946 16.195C6.61946 17.4062 7.47946 19.6984 9.31946 19.6984H11.9995" 
                stroke={fill} 
                stroke-width="1.5" 
                stroke-linecap="round" 
                stroke-linejoin="round" />
            <path 
                d="M5.48567 6.1853H5.49722" 
                stroke={fill}
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" />
            <path 
                d="M18.4857 19.198H18.4972" 
                stroke={fill}
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" />
        </svg>
    )
}

export default ItineraryIcon