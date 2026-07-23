import { h, type HTMLAttributes } from 'preact';
import "./OrchestraSVG.css"

type InstrumentGroup = 
  | 'violins-i'
  | 'violins-ii'
  | 'celli'
  | 'violas'
  | 'harp'
  | 'contrabasses'
  | 'keyboard-left'
  | 'keyboard-right'
  | 'woodwinds'
  | 'choir'
  | 'horns'
  | 'brass'
  | 'percussion'
  | 'synths'
  | 'fx';

type InstrumentCategory = 
  | 'strings'
  | 'keyboard'
  | 'woodwinds'
  | 'voices'
  | 'brass'
  | 'percussion'
  | 'synths'
  | 'fx'
  | 'all';

interface OrchestraSVGProps extends HTMLAttributes<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  className?: string;
  highlightList?: (InstrumentGroup | InstrumentCategory)[];
  highlightClassName?: string;
  mutedClassName?: string;
}

// Map categories to their member groups
const categoryMap: Record<InstrumentCategory, InstrumentGroup[]> = {
  'strings': ['violins-i', 'violins-ii', 'celli', 'violas', 'harp', 'contrabasses'],
  'keyboard': ['keyboard-left', 'keyboard-right'],
  'woodwinds': ['woodwinds'],
  'voices': ['choir'],
  'brass': ['horns', 'brass'],
  'percussion': ['percussion'],
  'synths': ['synths'],
  'fx': ['fx'],
  'all': [
    'violins-i', 'violins-ii', 'celli', 'violas', 'harp', 'contrabasses',
    'keyboard-left', 'keyboard-right', 'woodwinds', 'choir', 'horns', 
    'brass', 'percussion', 'synths', 'fx'
  ]
};

// Get all group IDs that should be highlighted
const getHighlightedGroups = (highlightList?: (InstrumentGroup | InstrumentCategory)[]): Set<string> => {
  if (!highlightList || highlightList.length === 0) {
    return new Set();
  }

  const groups = new Set<string>();
  
  highlightList.forEach(item => {
    if (item in categoryMap) {
      categoryMap[item as InstrumentCategory].forEach(group => groups.add(group));
    } else {
      groups.add(item as string);
    }
  });
  
  return groups;
};

// Define all instrument groups with their render function
const ALL_GROUPS: InstrumentGroup[] = [
  'violins-i', 'violins-ii', 'celli', 'violas', 'harp', 'contrabasses',
  'keyboard-left', 'keyboard-right', 'woodwinds', 'choir', 'horns', 
  'brass', 'percussion', 'synths', 'fx'
];

// Map group IDs to their path data
const groupPaths: Record<InstrumentGroup, { d: string; fill: string; strokeWidth?: number }> = {
  'violins-i': {
    d: "M603.692 434C603.692 408.595 582.857 387.499 558.056 393.006C537.206 397.637 517.094 405.433 498.442 416.202C479.79 426.97 462.982 440.49 448.547 456.232C431.376 474.956 439.229 503.547 461.231 516.25L524.844 552.977C539.809 561.617 558.848 555.389 573.813 546.749C588.778 538.109 603.692 524.734 603.692 507.454V434Z",
    fill: "#C94A4A"
  },
  'violins-ii': {
    d: "M603.692 434C603.692 408.595 624.526 387.499 649.327 393.006C670.178 397.637 690.29 405.433 708.942 416.202C727.594 426.97 744.402 440.49 758.837 456.232C776.007 474.956 768.154 503.547 746.153 516.25L684.857 551.639C669.452 560.533 649.853 554.122 634.448 545.228C619.044 536.334 603.692 522.567 603.692 504.779V434Z",
    fill: "#C94A4A"
  },
  'celli': {
    d: "M858.192 595C883.597 595 904.552 574.286 900.672 549.179C897.355 527.721 891.719 506.684 883.862 486.442C874.669 462.758 846.164 455.297 824.162 468L669.757 557.146C662.244 561.484 659.902 571.091 662.147 579.471C664.393 587.85 671.224 595 679.9 595H858.192Z",
    fill: "#C94A4A"
  },
  'violas': {
    d: "M350.192 595C324.787 595 303.831 574.286 307.712 549.179C311.028 527.72 316.665 506.684 324.522 486.442C333.715 462.758 362.22 455.297 384.221 468L538.627 557.146C546.14 561.484 548.482 571.091 546.236 579.471C543.991 587.85 537.159 595 528.484 595L350.192 595Z",
    fill: "#C94A4A"
  },
  'harp': {
    d: "M250.192 595C224.787 595 203.91 574.333 206.925 549.108C210.881 516.013 219.1 483.544 231.384 452.488C240.639 429.09 268.432 420.681 290.756 432.289L297.808 435.955C320.565 447.788 328.864 475.886 320.474 500.124C314.943 516.102 310.819 532.519 308.148 549.193C304.131 574.278 283.908 595 258.503 595H250.192Z",
    fill: "#E78774"
  },
  'contrabasses': {
    d: "M957.192 595C982.597 595 1003.47 574.333 1000.46 549.108C996.61 516.909 988.726 485.301 976.986 455.005C967.892 431.542 940.155 422.942 917.75 434.399L911.624 437.532C888.79 449.209 880.298 477.246 888.534 501.535C893.801 517.071 897.747 533.011 900.329 549.191C904.332 574.279 924.556 595 949.962 595H957.192Z",
    fill: "#A93636"
  },
  'keyboard-left': {
    d: "M149.192 594.5C123.787 594.5 102.973 573.862 105.304 548.564C109.472 503.344 119.776 458.899 135.93 416.458C144.967 392.715 172.739 383.34 195.553 394.518L203.098 398.215C225.912 409.394 235.069 436.89 226.582 460.835C216.518 489.231 209.692 518.673 206.236 548.601C203.321 573.838 182.999 594.5 157.594 594.5H149.192Z",
    fill: "#5FA66A"
  },
  'keyboard-right': {
    d: "M1058.19 598.5C1083.6 598.5 1104.41 577.862 1102.08 552.564C1097.62 504.154 1086.13 456.65 1067.97 411.553C1058.48 387.987 1030.53 379.145 1007.94 390.757L1003.22 393.182C980.622 404.794 971.989 432.46 980.953 456.231C992.659 487.271 1000.49 519.64 1004.27 552.599C1007.16 577.839 1027.48 598.5 1052.89 598.5L1058.19 598.5Z",
    fill: "#5FA66A"
  },
  'woodwinds': {
    d: "M210.083 371.25C188.082 358.547 180.375 330.267 195.044 309.524C236.903 250.33 291.237 200.779 354.422 164.49C430.939 120.543 517.715 97.6063 605.954 98.0051C694.193 98.4039 780.758 122.124 856.875 166.761C919.729 203.62 973.613 253.66 1014.94 313.23C1029.42 334.104 1021.45 362.314 999.339 374.817L989.874 380.168C967.759 392.671 939.901 384.685 924.928 364.16C892.872 320.217 852.037 283.18 804.836 255.5C744.364 220.038 675.591 201.193 605.489 200.876C535.387 200.56 466.447 218.782 405.657 253.696C358.207 280.948 317.039 317.614 284.587 361.266C269.43 381.654 241.5 389.389 219.499 376.686L210.083 371.25Z",
    fill: "#5FAF9A"
  },
  'choir': {
    d: "M128.521 316.597C106.672 303.635 99.3255 275.294 113.927 254.504C164.889 181.947 231.458 121.453 308.961 77.601C399.84 26.1806 502.59 -0.569036 607.006 0.00917622C711.422 0.587388 813.87 28.4733 904.174 80.8971C981.186 125.605 1047.08 186.832 1097.24 259.949C1111.61 280.899 1103.95 309.157 1081.96 321.877L1075.95 325.351C1053.96 338.071 1025.99 330.406 1011.3 309.678C970.004 251.4 916.58 202.501 854.501 166.463C779.125 122.705 693.613 99.4294 606.458 98.9467C519.303 98.4641 433.539 120.792 357.683 163.712C295.209 199.06 241.247 247.364 199.309 305.181C184.392 325.746 156.339 333.1 134.489 320.138L128.521 316.597Z",
    fill: "#E6CDD5"
  },
  'horns': {
    d: "M909.098 421.543C931.411 408.87 939.238 380.192 923.717 359.758C890.223 315.664 847.574 278.839 798.41 251.842C748.91 224.661 694.256 208.239 638.123 203.462C612.792 201.307 592.728 222.777 593.477 248.189L593.674 254.866C594.421 280.243 615.692 299.856 640.889 302.962C678.911 307.649 715.81 319.496 749.518 338.006C783.256 356.532 812.897 381.238 836.92 410.649C852.83 430.128 880.363 437.863 902.232 425.442L909.098 421.543Z",
    fill: "#D9C041"
  },
  'brass': {
    d: "M298.286 421.543C275.973 408.87 268.146 380.192 283.667 359.758C315.49 317.863 355.595 282.508 401.738 255.913C448.231 229.116 499.612 211.929 552.746 205.208C577.943 202.022 598.86 222.613 599.19 248.009L599.276 254.687C599.606 280.098 579.148 300.606 554.076 304.754C518.365 310.662 483.911 322.92 452.447 341.055C420.933 359.218 393.181 382.836 370.463 410.649C354.553 430.128 327.021 437.863 305.152 425.442L298.286 421.543Z",
    fill: "#D9A441"
  },
  'percussion': {
    d: "M384.221 468C362.22 455.297 354.429 426.881 370.343 407.078C393.52 378.236 421.92 353.825 454.192 335.192C499.798 308.862 551.531 295 604.192 295C656.853 295 708.586 308.862 754.192 335.192C786.464 353.825 814.863 378.236 838.041 407.078C853.955 426.881 846.164 455.297 824.162 468L822.449 468.989C800.448 481.692 772.632 473.681 755.373 455.039C741.394 439.939 725.173 426.955 707.203 416.58C675.883 398.498 640.356 388.978 604.192 388.978C568.027 388.978 532.5 398.498 501.181 416.58C483.211 426.955 466.989 439.939 453.01 455.039C435.751 473.681 407.936 481.692 385.934 468.989L384.221 468Z",
    fill: "#4F82B8"
  },
  'synths': {
    d: "M103.713 451.114C110.428 449.329 118.394 444.644 121.066 434.855C123.253 426.846 120.54 419.554 118.57 415.378C116.341 410.655 113.141 405.988 109.87 401.742C103.305 393.219 94.3496 383.741 86.1703 375.118C80.8159 369.473 75.7775 364.177 71.4299 359.336C82.8932 362.127 98.7681 366.97 120.213 374.533C128.844 377.577 138.308 373.048 141.352 364.417C144.396 355.786 139.868 346.322 131.237 343.278C101.507 332.792 80.2582 326.686 65.742 324.327C58.6688 323.178 51.7283 322.654 45.6941 323.746C39.5 324.868 30.2932 328.689 27.1937 339.227C24.7417 347.564 27.9695 355.088 29.8424 358.807C32.1029 363.296 35.3124 367.772 38.5575 371.848C45.0781 380.039 54.0083 389.37 62.1243 397.926C69.0386 405.216 75.4293 412.012 80.4408 418.022C68.8565 416.05 51.6827 411.642 27.1482 403.757C18.435 400.956 9.10102 405.75 6.30068 414.463C3.50047 423.176 8.29365 432.51 17.0067 435.31C46.8573 444.904 68.3364 450.24 83.121 451.867C90.3517 452.662 97.5036 452.764 103.713 451.114Z",
    fill: "#9A63C7",
    strokeWidth: 11
  },
  'fx': {
    d: "M1214.02 422.977L1156.47 456.339C1155.98 456.625 1155.46 456.868 1154.93 457.066L1105.45 475.384C1094.62 479.395 1086.74 464.893 1096 457.989L1107.2 449.638C1113.96 444.601 1110.54 433.863 1102.11 433.669C1094.99 433.505 1090.96 425.433 1095.11 419.643L1104.91 405.971C1108.83 400.501 1106.33 392.798 1099.95 390.663L1090.47 387.49C1085.61 385.864 1082.76 380.824 1083.88 375.822L1091.1 343.561C1092.39 337.805 1098.36 334.409 1103.97 336.239L1136.62 346.895C1142.87 348.936 1145.48 356.354 1141.89 361.863L1134.79 372.761C1130.3 379.634 1135.55 388.681 1143.74 388.206L1161.38 387.184C1168.5 386.771 1172.89 394.826 1168.69 400.588C1163.88 407.173 1170.28 416.07 1178.05 413.615L1205.99 404.79C1217.38 401.192 1224.35 416.986 1214.02 422.977Z",
    fill: "#A1B5D8",
    strokeWidth: 11
  }
};

const OrchestraSVG = ({
  className = '',
  highlightList,
  highlightClassName = 'highlighted',
  mutedClassName = 'muted',
  ...props 
}: OrchestraSVGProps) => {
  const highlightedGroups = getHighlightedGroups(highlightList);
  const hasHighlights = highlightedGroups.size > 0;

  const getGroupClassName = (groupId: string): string => {
    const classes = ['instrument-group'];
    if (hasHighlights) {
      if (highlightedGroups.has(groupId)) {
        classes.push(highlightClassName);
      } else {
        classes.push(mutedClassName);
      }
    }
    return classes.join(' ');
  };

  // Split groups into muted and highlighted
  const mutedGroups: InstrumentGroup[] = [];
  const highlightedGroupsList: InstrumentGroup[] = [];

  ALL_GROUPS.forEach(groupId => {
    if (hasHighlights && highlightedGroups.has(groupId)) {
      highlightedGroupsList.push(groupId);
    } else {
      mutedGroups.push(groupId);
    }
  });

  // Render a single group
  const renderGroup = (groupId: InstrumentGroup) => {
    const pathData = groupPaths[groupId];
    const className = getGroupClassName(groupId);
    const strokeWidth = pathData.strokeWidth || 11;
    
    return (
      <g key={groupId} id={groupId} className={className}>
        <path d={pathData.d} fill={pathData.fill} stroke="white" stroke-width={strokeWidth}/>
      </g>
    );
  };

  return (
    <svg 
      viewBox="-8 -8 1241 615" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`orchestra-svg ${className}`}
      {...props}
    >
      {/* Render muted groups first (bottom layer) */}
      {mutedGroups.map(renderGroup)}
      
      {/* Render highlighted groups on top */}
      {highlightedGroupsList.map(renderGroup)}
    </svg>
  );
};

export default OrchestraSVG;