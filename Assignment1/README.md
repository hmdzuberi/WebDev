# SWE 442 Assignments

Submitted by: Hamaad Zuberi

## Assignment 1

URLs:

Part 1: S3 Static Website Hosting
<http://hzuberi.gmu.s3-website-us-east-1.amazonaws.com/index.html>

Part 2: Deploying a Webpage on a Web Server Running on Amazon EC2 in AWS Cloud
<http://35.171.3.16/index.html>

## Assignment 2

URLs for survey: http://ec2-35-171-3-16.compute-1.amazonaws.com/survey.html

## Part 1: AWS S3 Static Website Hosting

### 1. Create a Bucket

1. Sign in to the [AWS S3 Console](https://console.aws.amazon.com/s3/).
2. Click **Create bucket**.
3. Enter **Bucket name**: `hzuberi.gmu`.
4. Select a **Region**, then click **Create**.

### 2. Enable Static Website Hosting

1. In the **Buckets** list, select `hzuberi.gmu`.
2. Go to **Properties** > **Static website hosting** > **Edit**.
3. Select **Use this bucket to host a website** and **Enable**.
4. Enter **index.html** as the **Index document**.
5. Enter **error.html** as the **Error document**.
6. Click **Save changes**.

### 3. Edit Block Public Access

1. In the bucket, go to **Permissions** > **Block public access (bucket settings)** > **Edit**.
2. Uncheck **Block all public access** and click **Save changes**.

### 4. Add a Bucket Policy

1. In **Permissions**, go to **Bucket Policy** > **Edit**.
2. Add the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::hzuberi.gmu/*"]
    }
  ]
}
```

3. Click **Save changes**.

### 5. Upload Index and Error Documents

Upload your existing `index.html`, `csdept.html`, `survey.html`, `style.css`, `image.png`, files to the `hzuberi.gmu` bucket.

### 6. Test Your Website

In **Properties**, find your **Bucket website endpoint** and open it to view your site.

## Part 2: Deploying a Webpage on a Web Server Running on Amazon EC2 in AWS Cloud

### 1. Launch an EC2 instance

1. Sign in to the [AWS EC2 Console](https://console.aws.amazon.com/ec2/).
2. Launch a new instance.
3. Use these settings to create a new instance:

- Instance Name: `instance1`
- OS: `Ubuntu`
- Instance Type: `t2.micro`
- Key Pair: Create a new RSA key pair, and use the `.pem` file for SSH access.
- Network Settings: Create a new security group and allow:
  - SSH (port 22)
  - HTTP (port 80)
  - HTTPS (port 443)

### 2. Connect to your instance

Once the instance has started, use the following command in the terminal to SSH into the instance:

```bash
ssh -i <your_key_pair.pem> ubuntu@<public-ip>
```

### 3. Setup the Web Server:\*\*

```bash
# Update and upgrade the instance:
sudo apt update && sudo apt upgrade -y

# Install Apache2
sudo apt install apache2

# Start and enable Apache2 service:
sudo systemctl start apache2
sudo systemctl enable apache2

# Allow Apache through the firewall:
sudo ufw allow 'Apache'
```

### 4. Deploy your web files

Navigate to the web server directory:

```bash
cd /var/www/html/
```

Move `index.html`, `csdept.html`, `survey.html`, `style.css`, and `image.png` to this directory.

```bash
# On your machine
cd <location_of_your_files>
scp -i <your_key_pair.pem> ./* ubuntu@<public-ip>:/var/www/html/
```

### 5. Set permissions for the web files

Change the ownership and permissions:

```bash
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

Your web server is now running and your webpage is deployed on the EC2 instance at:
`http://<public-ip>/index.html`
