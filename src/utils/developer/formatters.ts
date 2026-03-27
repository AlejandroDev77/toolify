// Developer Formatters and Utilities

export function formatJSON(json: string, minify: boolean = false): string {
  try {
    const parsed = JSON.parse(json);
    return minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
}

export function formatXML(xml: string): string {
  const PADDING = '  ';
  const reg = /(>)(<)(\/*)/g;
  let formatted = '';
  let pad = 0;

  xml = xml.replace(reg, '$1\n$2$3');
  
  xml.split('\n').forEach((node) => {
    let indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/)) {
      if (pad !== 0) {
        pad -= 1;
      }
    } else if (node.match(/^<\w([^>]*[^\/])?>.*$/)) {
      indent = 1;
    } else {
      indent = 0;
    }

    formatted += PADDING.repeat(pad) + node + '\n';
    pad += indent;
  });

  return formatted.trim();
}

export function formatSQL(sql: string): string {
  const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 
                    'INNER JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT'];
  
  let formatted = sql;
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    formatted = formatted.replace(regex, `\n${keyword}`);
  });

  return formatted.trim();
}

export function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Replace multiple spaces
    .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around special chars
    .trim();
}

export function minifyJS(js: string): string {
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
    .replace(/\/\/.*/g, '') // Remove single-line comments
    .replace(/\s+/g, ' ') // Replace multiple spaces
    .replace(/\s*([{}();,:])\s*/g, '$1') // Remove spaces around special chars
    .trim();
}

export function minifyHTML(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/\s+/g, ' ') // Replace multiple spaces
    .replace(/>\s+</g, '><') // Remove spaces between tags
    .trim();
}

export function encodeBase64(text: string): string {
  return btoa(unescape(encodeURIComponent(text)));
}

export function decodeBase64(encoded: string): string {
  return decodeURIComponent(escape(atob(encoded)));
}

export function encodeURL(text: string): string {
  return encodeURIComponent(text);
}

export function decodeURL(encoded: string): string {
  return decodeURIComponent(encoded);
}

export interface JWTDecoded {
  header: any;
  payload: any;
  signature: string;
}

export function decodeJWT(token: string): JWTDecoded {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format');
  }

  return {
    header: JSON.parse(decodeBase64(parts[0])),
    payload: JSON.parse(decodeBase64(parts[1])),
    signature: parts[2],
  };
}

export function generateHash(text: string, algorithm: 'md5' | 'sha1' | 'sha256'): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  
  const algoMap = {
    md5: 'MD5',
    sha1: 'SHA-1',
    sha256: 'SHA-256',
  };

  return crypto.subtle.digest(algoMap[algorithm], data).then(hashBuffer => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  });
}

export function convertColor(color: string, to: 'hex' | 'rgb' | 'hsl'): string {
  // Simple color conversion (basic implementation)
  if (to === 'hex') {
    // Assume input is rgb(r, g, b)
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const r = parseInt(match[1]).toString(16).padStart(2, '0');
      const g = parseInt(match[2]).toString(16).padStart(2, '0');
      const b = parseInt(match[3]).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
    }
  }
  return color;
}

export function generateCronExpression(
  minute: string = '*',
  hour: string = '*',
  dayOfMonth: string = '*',
  month: string = '*',
  dayOfWeek: string = '*'
): string {
  return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
}

export function parseCronExpression(cron: string): {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
  description: string;
} {
  const parts = cron.split(' ');
  if (parts.length !== 5) {
    throw new Error('Invalid cron expression');
  }

  let description = 'Runs ';
  if (parts[0] === '*') description += 'every minute';
  else description += `at minute ${parts[0]}`;

  if (parts[1] !== '*') description += ` of hour ${parts[1]}`;
  if (parts[2] !== '*') description += ` on day ${parts[2]}`;
  if (parts[3] !== '*') description += ` of month ${parts[3]}`;
  if (parts[4] !== '*') description += ` on ${parts[4]} day of week`;

  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
    description,
  };
}

export function convertEpoch(timestamp: number, toFormat: 'date' | 'iso' | 'relative'): string {
  const date = new Date(timestamp * 1000);
  
  switch (toFormat) {
    case 'iso':
      return date.toISOString();
    case 'relative':
      const now = Date.now();
      const diff = now - date.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      
      if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
      if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    default:
      return date.toLocaleString();
  }
}

export function csvToJSON(csv: string): any[] {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });
}

export function jsonToCSV(json: any[]): string {
  if (json.length === 0) return '';
  
  const headers = Object.keys(json[0]);
  const csvLines = [headers.join(',')];
  
  json.forEach(obj => {
    const values = headers.map(header => obj[header] || '');
    csvLines.push(values.join(','));
  });
  
  return csvLines.join('\n');
}
