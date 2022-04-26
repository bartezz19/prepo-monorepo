import { IconProps } from '../icon.types'

type Props = Omit<IconProps, 'name'>

const Twitter: React.FC<Props> = ({ color = 'white', width = '24', height = '24', onClick }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <g clipPath="url(#clip0_113:13)">
      <path
        d="M23.9518 4.56975C23.0535 4.96463 22.1021 5.22542 21.1281 5.34375C22.1549 4.72747 22.9235 3.76001 23.2918 2.6205C22.3206 3.18375 21.2636 3.58382 20.1628 3.80475C19.4226 3.01385 18.442 2.48934 17.3733 2.31263C16.3045 2.13591 15.2073 2.31685 14.2519 2.82738C13.2965 3.33791 12.5363 4.14948 12.0892 5.13619C11.6421 6.12289 11.5332 7.22956 11.7793 8.2845C7.68956 8.09325 4.06406 6.12825 1.63931 3.15975C1.19792 3.91041 0.967065 4.76619 0.971059 5.637C0.970457 6.44652 1.16977 7.24367 1.55129 7.95765C1.93281 8.67163 2.48474 9.28035 3.15806 9.72975C2.37778 9.70617 1.61449 9.49606 0.932059 9.117V9.17625C0.93182 10.3125 1.32447 11.4139 2.04345 12.2938C2.76243 13.1736 3.76352 13.7779 4.87706 14.004C4.45525 14.1167 4.02066 14.1744 3.58406 14.1758C3.26831 14.1758 2.96681 14.145 2.66606 14.0895C2.98295 15.0673 3.59681 15.922 4.42219 16.5345C5.24757 17.1471 6.24339 17.4871 7.27106 17.5073C5.52987 18.8708 3.3814 19.6106 1.16981 19.608C0.778088 19.6096 0.38663 19.5875 -0.00244141 19.542C2.25363 20.9876 4.87733 21.755 7.55681 21.753C16.6071 21.753 21.5526 14.2568 21.5526 7.76475C21.5526 7.55775 21.5526 7.347 21.5368 7.1355C22.5042 6.44216 23.3379 5.57921 23.9976 4.5885L23.9518 4.56975Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0_113:13">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default Twitter