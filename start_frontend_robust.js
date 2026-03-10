const { spawn } = require('child_process');
const path = require('path');

// T: is mapped to "c:\Users\zeelk\OneDrive\Desktop\AI & Automation for Manufacturing SMEs"
const frontendDir = 'T:\\smartfactory-ai\\frontend';

console.log(`Attempting to start frontend in: ${frontendDir}`);

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const p = spawn(npm, ['start'], {
    cwd: frontendDir,
    env: { ...process.env, PORT: '3000', BROWSER: 'none' },
    shell: false,
    stdio: 'inherit'
});

p.on('error', (err) => {
    console.error('CRITICAL ERROR: Failed to start process:', err);
});

p.on('exit', (code) => {
    console.log(`Frontend process exited with code ${code}`);
});

setTimeout(() => {
    console.log('Script has been running for 30s. Assuming server is attempting to start...');
}, 30000);
