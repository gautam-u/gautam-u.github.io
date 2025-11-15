# gautam-u.github.io - Root Domain for AdMob Verification

**Purpose:** This repository hosts `app-ads.txt` at the root domain for AdMob verification across ALL your iOS apps.

**Live URL:** https://gautam-u.github.io

---

## 🎯 How This Works

### **One Domain, Multiple Apps**

All your iOS apps use the **SAME** developer website in App Store Connect:
- **Developer Website (App Store Connect):** `https://gautam-u.github.io`
- **app-ads.txt location:** `https://gautam-u.github.io/app-ads.txt`
- **Publisher ID:** `pub-6317301501720836` (same for all apps)

### **Why This Setup?**

✅ **One app-ads.txt for all apps** - AdMob only cares about publisher ID
✅ **No App Store Connect changes needed** - Set once, forget it
✅ **Easy app switching** - Just update redirect to verify different apps
✅ **Free hosting** - GitHub Pages is free and reliable

---

## 🔄 Switching Between Apps for AdMob Verification

When you need to verify a different app in AdMob, **just update the redirect** in `index.html`.

### **Quick Switch Command**

```bash
cd /Users/gauti/Developer/projects/ios/gautam-u.github.io

# For SnackSmart AI:
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SnackSmart AI - Smart Nutrition Tracking</title>
    <meta http-equiv="refresh" content="0; url=https://gautam-u.github.io/snacksmart-website/">
</head>
<body>
    <p>Redirecting to <a href="https://gautam-u.github.io/snacksmart-website/">SnackSmart website</a>...</p>
</body>
</html>
EOF

# For HomeGym Pro:
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HomeGym Pro - Your Personal Fitness Companion</title>
    <meta http-equiv="refresh" content="0; url=https://gautam-u.github.io/fitjournal-website/">
</head>
<body>
    <p>Redirecting to <a href="https://gautam-u.github.io/fitjournal-website/">HomeGym Pro website</a>...</p>
</body>
</html>
EOF

# Commit and push
git add index.html
git commit -m "Switch redirect to [AppName]"
git push origin main

# Wait 2-5 minutes for GitHub Pages deployment
# Then trigger AdMob verification crawl
```

---

## 📋 Step-by-Step: Verify New App in AdMob

### **Step 1: Update Redirect** (2 minutes)

Edit `index.html` to point to the app you want to verify:

**For SnackSmart AI:**
```html
<meta http-equiv="refresh" content="0; url=https://gautam-u.github.io/snacksmart-website/">
```

**For HomeGym Pro:**
```html
<meta http-equiv="refresh" content="0; url=https://gautam-u.github.io/fitjournal-website/">
```

**For Future Apps:**
```html
<meta http-equiv="refresh" content="0; url=https://gautam-u.github.io/[your-app-website]/">
```

### **Step 2: Commit and Push**

```bash
git add index.html
git commit -m "Switch redirect to [AppName] for AdMob verification"
git push origin main
```

### **Step 3: Wait for Deployment** (2-5 minutes)

GitHub Pages auto-deploys. Check deployment status:
```bash
# Wait 3-5 minutes, then verify:
curl -I https://gautam-u.github.io/
```

### **Step 4: Trigger AdMob Verification**

1. Go to: https://apps.admob.com
2. Navigate to **Apps** → **[Your App Name]**
3. Find **app-ads.txt** section
4. Click **"Check for updates"** or **"Crawl app-ads.txt"**
5. Wait 5-10 minutes

### **Step 5: Verify Success**

AdMob should show:
✅ **"[Your App Name] verified"**
✅ Green checkmark next to app-ads.txt

---

## 📱 Your Apps Configuration

### **App Store Connect Setup (ONE-TIME - Never Change)**

All apps should have this in App Store Connect → App Information:
- **Developer Website:** `https://gautam-u.github.io`
- **Privacy Policy:** App-specific (e.g., `https://gautam-u.github.io/snacksmart-website/privacy-policy/`)
- **Support URL:** App-specific (e.g., `https://gautam-u.github.io/snacksmart-website/support/`)

### **Current Apps:**

| App Name | Website Path | Redirect URL |
|----------|-------------|--------------|
| **SnackSmart AI** | `/snacksmart-website/` | `https://gautam-u.github.io/snacksmart-website/` |
| **HomeGym Pro** | `/fitjournal-website/` | `https://gautam-u.github.io/fitjournal-website/` |
| **Future App** | `/future-app-website/` | `https://gautam-u.github.io/future-app-website/` |

### **AdMob Configuration (ONE-TIME - Same for All Apps)**

- **Publisher ID:** `pub-6317301501720836`
- **app-ads.txt location:** `https://gautam-u.github.io/app-ads.txt`
- **Content:** `google.com, pub-6317301501720836, DIRECT, f08c47fec0942fa0`

---

## 🔧 Files in This Repository

```
gautam-u.github.io/
├── README.md          # This file (documentation)
├── index.html         # Redirect to current app (CHANGE THIS when switching apps)
└── app-ads.txt        # AdMob publisher declaration (NEVER CHANGE)
```

### **index.html** - The Only File You Change

**Purpose:** Redirects visitors to whichever app you're currently promoting/verifying

**When to change:** When you need to verify a different app in AdMob

**How to change:** Update the `url=` in the meta refresh tag

### **app-ads.txt** - Never Touch This

**Purpose:** Declares your publisher ID to AdMob

**Content:**
```
google.com, pub-6317301501720836, DIRECT, f08c47fec0942fa0
```

**When to change:** NEVER (unless you get a new AdMob account)

---

## 🚨 Troubleshooting AdMob Verification

### **Issue: "We couldn't verify [App Name]"**

**Check 1: Is app-ads.txt accessible?**
```bash
curl https://gautam-u.github.io/app-ads.txt
```
**Expected:** `google.com, pub-6317301501720836, DIRECT, f08c47fec0942fa0`

**Check 2: Does App Store Connect have correct domain?**
- Go to App Store Connect → [App] → App Information
- **Developer Website** should be: `https://gautam-u.github.io` (NO /app-website/ path)

**Check 3: Did you wait long enough?**
- GitHub Pages deployment: 2-5 minutes
- AdMob verification crawl: 5-10 minutes
- **Total wait time:** 10-15 minutes

**Check 4: Is the redirect working?**
```bash
curl -L https://gautam-u.github.io/
```
**Should redirect to:** Your app's website

### **Issue: "Publisher ID mismatch"**

**Cause:** app-ads.txt has wrong publisher ID

**Fix:**
```bash
echo "google.com, pub-6317301501720836, DIRECT, f08c47fec0942fa0" > app-ads.txt
git add app-ads.txt
git commit -m "Fix publisher ID"
git push origin main
```

### **Issue: "File not found"**

**Cause:** app-ads.txt not at root domain

**Fix:** This repo IS the root domain - should work automatically. Check GitHub Pages settings:
1. Go to: https://github.com/gautam-u/gautam-u.github.io/settings/pages
2. **Source:** Deploy from a branch
3. **Branch:** `main` → `/ (root)`

---

## 📝 Quick Reference

### **When Launching New App:**

1. ✅ Create app website at `https://gautam-u.github.io/new-app-website/`
2. ✅ Set **Developer Website** in App Store Connect to `https://gautam-u.github.io`
3. ✅ Set **Privacy Policy** to `https://gautam-u.github.io/new-app-website/privacy-policy/`
4. ✅ Set **Support URL** to `https://gautam-u.github.io/new-app-website/support/`
5. ✅ Update **this repo's `index.html`** to redirect to new app
6. ✅ Wait 5 minutes for GitHub Pages deployment
7. ✅ Trigger AdMob verification

### **When Switching Apps for Verification:**

1. Update `index.html` redirect URL
2. Commit and push
3. Wait 5 minutes
4. Trigger AdMob crawl
5. Wait 10 minutes
6. Check verification status

---

## 🎯 Best Practices

### **DO:**
✅ Update `index.html` when switching apps
✅ Wait 5 minutes after pushing changes
✅ Keep `app-ads.txt` identical across all apps
✅ Use same publisher ID for all apps
✅ Set Developer Website to `https://gautam-u.github.io` for ALL apps

### **DON'T:**
❌ Change `app-ads.txt` content
❌ Use different domains for different apps
❌ Put app-specific paths in App Store Connect Developer Website field
❌ Expect instant verification (wait 10-15 minutes total)
❌ Create separate AdMob publisher IDs for each app

---

## 🔗 Useful Links

- **Live Site:** https://gautam-u.github.io
- **app-ads.txt:** https://gautam-u.github.io/app-ads.txt
- **GitHub Repo:** https://github.com/gautam-u/gautam-u.github.io
- **AdMob Console:** https://apps.admob.com
- **App Store Connect:** https://appstoreconnect.apple.com

---

## 📚 Additional Resources

- **AdMob app-ads.txt Guide:** https://support.google.com/admob/answer/9363762
- **IAB Tech Lab Spec:** https://iabtechlab.com/ads-txt/
- **GitHub Pages Docs:** https://docs.github.com/en/pages

---

**Last Updated:** November 15, 2025
**Publisher ID:** `pub-6317301501720836`
**Total Apps Using This Setup:** 2 (SnackSmart AI, HomeGym Pro)
