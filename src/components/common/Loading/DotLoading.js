

export default function DotLoading() {
  return (
    <div className='dotLoading-cmt'>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ margin: 'auto', background: 'transparent', display: 'block' }}
        width="100px" height="100px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className='dotLoading-svg'
      >
        <g transform="translate(20 50)">
          <circle cx={0} cy={0} r={6} fill="#111010">
            <animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" />
          </circle>
        </g><g transform="translate(40 50)">
          <circle cx={0} cy={0} r={6} fill="#1d1c1c">
            <animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" />
          </circle>
        </g><g transform="translate(60 50)">
          <circle cx={0} cy={0} r={6} fill="#544d50">
            <animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" />
          </circle>
        </g><g transform="translate(80 50)">
          <circle cx={0} cy={0} r={6} fill="#727272">
            <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  )
}