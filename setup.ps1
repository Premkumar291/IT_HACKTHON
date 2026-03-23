cd C:\Users\bhara\OneDrive\Desktop\Hackthon_platform
Write-Host "Creating client directory..."
npx -y create-vite@latest client --template react-ts

cd client
Write-Host "Installing standard client dependencies..."
npm install

Write-Host "Installing Tailwind and other UI frameworks..."
npm install @tailwindcss/vite tailwindcss lucide-react framer-motion react-hook-form react-router-dom axios clsx tailwind-merge

cd ..\server
Write-Host "Installing backend dependencies..."
npm init -y
npm install express cors dotenv googleapis

Write-Host "Setup complete!"
