import { IconProps } from '../../icon.types'

type Props = Omit<IconProps, 'name'>

const TwitterIcon: React.FC<Props> = ({
  color = 'white',
  width = '20',
  height = '16',
  onClick,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M19.634 0.0310227C18.819 0.416023 17.432 1.13802 16.735 1.27602C16.708 1.28302 16.686 1.29202 16.66 1.29902C15.847 0.497022 14.733 2.25262e-05 13.5 2.25262e-05C11.015 2.25262e-05 9.00002 2.01502 9.00002 4.50002C9.00002 4.63102 8.98902 4.87202 9.00002 5.00002C5.78202 5.00002 3.43202 3.32102 1.67302 1.16302C1.43802 0.873023 1.18802 1.02402 1.13602 1.23002C1.01902 1.69602 0.979019 2.47502 0.979019 3.03102C0.979019 4.43202 2.07402 5.80802 3.77902 6.66102C3.46502 6.74202 3.11902 6.80002 2.75902 6.80002C2.33502 6.80002 1.84702 6.68902 1.42002 6.46502C1.26202 6.38202 0.921019 6.40502 1.02202 6.80902C1.42702 8.42802 3.27502 9.56502 4.92602 9.89602C4.55102 10.117 3.75102 10.072 3.38302 10.072C3.24702 10.072 2.77402 10.04 2.46802 10.002C2.18902 9.96802 1.76002 10.04 2.11902 10.584C2.89002 11.751 4.63402 12.484 6.13502 12.512C4.75302 13.596 2.49302 13.992 0.328019 13.992C-0.109981 13.982 -0.0879806 14.481 0.265019 14.666C1.86202 15.504 4.47802 16 6.34702 16C13.777 16 18 10.337 18 4.99902C18 4.91302 17.998 4.73302 17.995 4.55202C17.995 4.53402 18 4.51702 18 4.49902C18 4.47202 17.992 4.44602 17.992 4.41902C17.989 4.28302 17.986 4.15602 17.983 4.09002C18.572 3.66502 19.474 2.92702 19.93 2.36202C20.085 2.17002 19.96 1.93702 19.749 2.01002C19.206 2.19902 18.267 2.56502 17.679 2.63502C18.856 1.85602 19.438 1.17802 19.938 0.425023C20.109 0.168023 19.895 -0.0929773 19.634 0.0310227Z"
        fill={color}
      />
    </svg>
  )
}

export default TwitterIcon