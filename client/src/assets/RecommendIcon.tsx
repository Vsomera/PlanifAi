interface Props {
    width: string
    height: string
    fill: string
}

const RecommendIcon = (props : Props) => {

    const { width, height, fill } = props

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.57 18.5V14.6" stroke={fill} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.57 7.45V5.5" stroke={fill} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15.57 12.65C17.0059 12.65 18.17 11.4859 18.17 10.05C18.17 8.61406 17.0059 7.45 15.57 7.45C14.134 7.45 12.97 8.61406 12.97 10.05C12.97 11.4859 14.134 12.65 15.57 12.65Z" stroke={fill} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.42999 18.5V16.55" stroke={fill} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.42999 9.4V5.5" stroke={fill} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.43002 16.55C9.86596 16.55 11.03 15.3859 11.03 13.95C11.03 12.5141 9.86596 11.35 8.43002 11.35C6.99408 11.35 5.83002 12.5141 5.83002 13.95C5.83002 15.3859 6.99408 16.55 8.43002 16.55Z" stroke={fill} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default RecommendIcon
