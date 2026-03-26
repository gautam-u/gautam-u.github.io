#!/bin/bash

# Switch App Redirect for AdMob Verification
# Usage: ./switch-app.sh [app-name]
# Example: ./switch-app.sh snacksmart

set -e

APP_NAME=$1

if [ -z "$APP_NAME" ]; then
    echo "❌ Error: No app name provided"
    echo ""
    echo "Usage: ./switch-app.sh [app-name]"
    echo ""
    echo "Available apps:"
    echo "  snacksmart    - SnackSmart AI"
    echo "  homegym       - HomeGym Pro"
    echo "  clarityflow   - ClarityFlow"
    echo ""
    exit 1
fi

case "$APP_NAME" in
    snacksmart)
        TITLE="SnackSmart AI - Smart Nutrition Tracking"
        URL="https://gautam-u.github.io/snacksmart-website/"
        DISPLAY_NAME="SnackSmart AI"
        ;;
    homegym)
        TITLE="HomeGym Pro - Your Personal Fitness Companion"
        URL="https://gautam-u.github.io/fitjournal-website/"
        DISPLAY_NAME="HomeGym Pro"
        ;;
    clarityflow)
        TITLE="ClarityFlow - Decision Tracker & Subscription Manager"
        URL="https://gautam-u.github.io/clarityflow-website/"
        DISPLAY_NAME="ClarityFlow"
        ;;
    *)
        echo "❌ Error: Unknown app name '$APP_NAME'"
        echo ""
        echo "Available apps:"
        echo "  snacksmart    - SnackSmart AI"
        echo "  homegym       - HomeGym Pro"
        echo "  clarityflow   - ClarityFlow"
        echo ""
        exit 1
        ;;
esac

echo "🔄 Switching redirect to $DISPLAY_NAME..."
echo ""

# Create new index.html
cat > index.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$TITLE</title>
    <meta http-equiv="refresh" content="0; url=$URL">
</head>
<body>
    <p>Redirecting to <a href="$URL">$DISPLAY_NAME website</a>...</p>
</body>
</html>
EOF

echo "✅ index.html updated to redirect to: $URL"
echo ""

# Git operations
echo "📦 Committing changes..."
git add index.html
git commit -m "Switch redirect to $DISPLAY_NAME for AdMob verification"

echo ""
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Successfully switched to $DISPLAY_NAME"
echo ""
echo "⏰ Next steps:"
echo "   1. Wait 3-5 minutes for GitHub Pages deployment"
echo "   2. Verify redirect: curl -I https://gautam-u.github.io/"
echo "   3. Go to AdMob: https://apps.admob.com"
echo "   4. Navigate to Apps → $DISPLAY_NAME"
echo "   5. Click 'Check for updates' in app-ads.txt section"
echo "   6. Wait 5-10 minutes for verification"
echo ""
echo "🎯 Developer Website (for App Store Connect): https://gautam-u.github.io"
echo "📝 app-ads.txt location: https://gautam-u.github.io/app-ads.txt"
echo ""
