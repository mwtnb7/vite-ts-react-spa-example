import { test, expect } from "@playwright/test";

test.describe("E2Eテスト - Step1からStep5まで", () => {
	test("ステップ1からステップ5までの一連の流れをテストする", async ({ page }) => {
		// ステップ1: アプリケーションのトップページに移動
		console.log("ステップ1: トップページに移動");
		await page.goto("/simulation/");

		// 物件選択モーダルを開く
		await page.click(".js-select-property .c-forms__select select");

		// モーダルが開くのを待つ
		await expect(page.locator(".c-modal-inner")).toBeVisible();

		// モーダル内の最初の物件を選択
		// await page.click(".c-property-modal-inner .c-forms__select-property-selected.is-card:first-child");
		// await page.click(".c-property-modal-inner .c-forms__select-property-selected.is-card:nth-child(4)");
		await page.click(".c-property-modal-inner .c-forms__select-property-selected.is-card:nth-child(22)");

		// モーダルが閉じるのを待つ
		await expect(page.locator(".c-modal-inner")).toBeHidden();

		// 選択された物件が表示されていることを確認
		await page.waitForSelector(".c-forms__select-property-selected .c-forms__propety-title", {
			state: "visible",
		});

		const selectedProperty = page.locator(".c-forms__select-property-selected .c-forms__propety-title");
		await expect(selectedProperty).toBeVisible();

		// 次のステップに進む
		await page.click('button.c-button.is-lg:has-text("次へ")');

		// ステップ2: 個室タイプを選択する
		console.log("ステップ2: 個室タイプを選択する");
		await expect(page).toHaveURL(/.*\/step2/);

		// 入力フィールドが表示されるまで待機
		await page.waitForSelector('.c-forms__radio input[name="room-type"]', {
			state: "visible",
		});

		// 個室タイプの選択肢を取得
		const roomOptions = page.locator('.c-forms__radio input[name="room-type"]');

		// 選択肢が少なくとも1つ以上あることを確認
		const roomOptionCount = await roomOptions.count();
		if (roomOptionCount === 0) {
			throw new Error("個室タイプの選択肢が見つかりません");
		}

		// 最初の個室タイプを選択
		// await roomOptions.first().click();
		await roomOptions.nth(1).click();

		// 次のステップに進む
		// await page.click('button.c-button.is-lg:has-text("次へ")');

		// ステップ3: 食事プランを選択する
		console.log("ステップ3: 食事プランを選択する");
		await expect(page).toHaveURL(/.*\/step3/);

		// 入力フィールドが表示されるまで待機
		await page.waitForSelector('.c-forms__radio input[name="meal-plan"]', {
			state: "visible",
		});

		// 食事プランの選択肢を取得
		const mealOptions = page.locator('.c-forms__radio input[name="meal-plan"]');
		const mealOptionCount = await mealOptions.count();
		if (mealOptionCount === 0) {
			throw new Error("食事プランの選択肢が見つかりません");
		}

		// "食事込"を選択
		// await mealOptions.first().click(); // 食事込・食事なし
		await mealOptions.nth(1).click(); // 食事別

		// 次のステップに進む
		// await page.click('button.c-button.is-lg:has-text("次へ")');

		// ステップ4: 契約年数を選択する
		await expect(page).toHaveURL(/.*\/step4/);

		// 入力フィールドが表示されるまで待機
		await page.waitForSelector('.c-forms__radio input[name="how-long"]', {
			state: "visible",
		});

		// 契約年数の選択肢を取得
		console.log("ステップ4: 契約年数を選択する");
		const yearOptions = page.locator('.c-forms__radio input[name="how-long"]');
		const yearOptionCount = await yearOptions.count();
		if (yearOptionCount === 0) {
			throw new Error("契約年数の選択肢が見つかりません");
		}

		// "1年"を選択
		await yearOptions.first().click();

		// 次のステップに進む
		// await page.click('button.c-button.is-lg:has-text("次へ")');

		// ステップ5: 個人情報を入力する
		console.log("ステップ5: 個人情報を入力する");
		await expect(page).toHaveURL(/.*\/step5/);

		// フォームが表示されるまで待機
		await page.waitForSelector('input[name="your-name"]', {
			state: "visible",
		});

		// フォームにデータを入力
		await page.fill('input[name="your-name"]', "山田 太郎");
		await page.fill('input[name="your-email"]', "m.watanabe@grow-group.jp");
		await page.fill('input[name="tel-number"]', "090-1234-5678");

		// フォームを送信
		await page.click('button.c-button.is-lg:has-text("送信する")');

		// 完了ページに遷移していることを確認
		await expect(page).toHaveURL(/.*\/complete/);

		// 完了メッセージを確認
		const completionMessage = page.locator(".c-forms__head");
		await expect(completionMessage).toHaveText(/ご回答\s*ありがとうございました。/);

		// 追加のメッセージを確認
		const completionText = page.locator(".c-forms__text");
		await expect(completionText).toContainText(
			"この度は料金シミュレーションにご回答いただき、誠にありがとうございます。"
		);

		console.log("テスト完了");
	});
});
